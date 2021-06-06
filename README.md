## Project :)

- Frontend built with Reactjs
- Backend built with Node Express
- NGINX as reverse proxy
- Python for analytical purposes

## Troubleshooting

### What environment was used to develop this?

Windows 10, using Docker with the WSL2 engine enabled

### What containers are currently running?

- 2 Node containers - 1 for React, 1 for API
- 1 Redis container

### Failing to build frontend, something related to `node-gyp`?

Edited the dockerfile to install python and use a specific version of node
instead of the latest. Other solutions recommended globally installing certain
packages to npm.
