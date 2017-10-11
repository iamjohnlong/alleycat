# Alleycat

A work in progress client side html5 history router.

## Installing

```
$ npm install alleycat --save
```

Creating a router: 

```javascript
import router from 'alleycat';

const routes = {
  '/': {
    name: 'root'
  },
  '/about': {
    name: 'about',
    render() {
      console.log('i matched about');
    }
  },
  '/posts/:id': {
    name: 'posts',
    render({ params }) {
      console.log(`i matched posts with id ${params.id}`);
    }
  },
  '/404': {
    render() {
      console.log('bad bad not good.')
    }
  }
};

const hooks = {
  didMount({ path }) {
    console.log(`the router is mounted at ${path}`)
  },
  // gets call on every match
  onMatch({ name, path, params, pattern }) {

  },
  // gets call on no match
  notFound() {
    router.set('/404');
  }
};

router('/', routes, hooks);

// sets the current route
router.set('/posts/123');

// gets the current route
router.get();

```
