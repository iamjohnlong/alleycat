import router from '../src/alleycat.js';

const domain = 'http://needlepoint.com';

describe('alleycat', () => {
  it('should mount router', () => {
    const routes = {
      '/': { name: 'home' }
    };
    let didMount = false;
    let params;
    const hooks = {
      didMount(ctx) {
        didMount = true
      }
    };
    router('/', routes, hooks);
    expect(didMount).toEqual(true);
  });
  it('should mount with a prefix', () => {
    let found = false;
    const routes = {
      '/': {},
      '/bar': {
        render() {
          found = true;
        }
      }
    };
    router('/foo', routes);
    router.set('/bar');
    expect(location.href).toEqual(`${domain}/foo/bar`);
    expect(found).toEqual(true);
  });
  it('should call notFound hook', () => {
    const routes = {
      '/': {},
      '/foo': {},
      '/bar': {},
      '/404': {}
    };
    const hooks = {
      notFound() {
        console.log('should');
        router.set('/404');
      }
    };
    router('/', routes, hooks);
    router.set('/abc');
    expect(location.href).toEqual(`${domain}/404`);
  });
  it('should call onMatch hook', () => {
    let didMatch = false;
    const routes = {
      '/': {},
      '/foo': {},
      '/bar': {},
      '/404': {}
    };
    const hooks = {
      onMatch() {
        didMatch = true;
      }
    };
    router('/', routes, hooks);
    expect(didMatch).toEqual(true);
    didMatch = false;
    router.set('/foo');
    expect(didMatch).toEqual(true);
  });
  it('should call match ad pass params', () => {
    let id;
    const routes = {
      '/': {},
      '/foo/:id': {
        render(args) {
          id = args.params.id;
        }
      },
    };
    router('/', routes);
    router.set('/foo/123');
    expect(id).toEqual('123');
  });
});