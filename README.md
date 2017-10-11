# Alleycat

A work in progress router 

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
    render(args) {
      console.log('i matched about')
    }
  },
  '/posts/:id': {
    name: 'posts',
    render(args) {
      console.log(`i matched posts with id ${args.params.id}`)
    }
  }
};

router('/', routes);

router.set('/posts/123')

```
