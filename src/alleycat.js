import UrlPattern from 'url-pattern';

let routes;
let curLoc;
let args;
let didMount;
let prefix;
const noop = () => {};
const hooks = {
  didMount: noop,
  onMatch: noop,
  notFound: noop,
};

const router = (pre, c, h, notFoundFn) => {
  didMount = false;
  prefix = pre === '/' ? '' : pre;
  routes = Object.keys(c).map((route) => {
    c[route].pattern = new UrlPattern(prefix + route);
    return c[route];
  });
  Object.assign(hooks, h);
  match(location.pathname);
};

router.set = (loc) => {
  if (curLoc === loc) return;
  window.history.pushState(null, null, prefix + loc);
  if (didMount) match(prefix + loc);
};

router.get = () => args;

/**
 * @param {string} loc
 */
const match = (loc) => {
  curLoc = loc;
  let notFound = true;
  for (let route of routes) {
    const found = route.pattern.match(curLoc);
    args = { params: found, path: curLoc, name: route.name, ...route };
    if (!didMount && found !== null) {
      didMount = true;
      hooks.didMount.call(null, args);
    }
    if (found !== null) {
      matched(route, args);
      notFound = false;
      break;
    }
  }
  if (notFound) {
    didMount = true;
    hooks.didMount.call(null, args);
    hooks.notFound(args);
  }
};

/**
 * @param {object} route
 * @param {object} args
 */
const matched = (route, args) => {
  let i = 0;
  const next = () => {
    if (route.middleware.length !== i) {
      const f = route.middleware[i];
      i++;
      f.call(null, args, next);
    } else {
      done(route.render, args);
    }
  };
  (route.middleware && route.middleware.length) ? next() : done(route.render, args, true);
}

const done = (fn, args, after) => {
  const ret = fn ? (typeof fn === 'object') ? fn : fn.call(null, args) : undefined;
  if (args.after) args.after(args)
  if (after) hooks.onMatch(args, ret);
}

const onChange = () => {
  match(location.pathname);
}

window.onhashchange = window.onpopstate = onChange;

export default router;
