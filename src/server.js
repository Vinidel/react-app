import Server from 'socket.io'


export default function startServer(store) {
    const io = Server().attach(8090);
    store.subscribe(
        () => io.emit('store', store.get().toJS())
    );

    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
    });

}