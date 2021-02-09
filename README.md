### access-request

To develop and symlink locally:

```
npm run build:dev
npm link
```

In the consuming project:
```
npm link @openlattice/access-request
```

To unlink:
```
npm unlink @openlattice/access-request --no-save
npm i
```
