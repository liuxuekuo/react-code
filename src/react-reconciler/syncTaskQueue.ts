let syncQueue: ((...args: any) => void)[] | null = null;
let isFlushingSyncQueue = false;

export function scheduleSyncCallback(callback: (...args: any) => void) {
    if (syncQueue === null) {
        syncQueue = [callback];
    } else {
        syncQueue.push(callback);
    }

    console.log('syncQueue', syncQueue)
}

export function flushSyncCallbacks() {
    console.log('isFlushingSyncQueue',isFlushingSyncQueue)

    // 第一次执行的时候，进去if

    if (!isFlushingSyncQueue && syncQueue) {
        isFlushingSyncQueue = true;

        console.log('isFlushingSyncQueue改为true')
        try {
            // 实际上就是执行3次 render函数
            syncQueue.forEach((callback) => callback());
        } catch (e) {
            console.error('flushSyncCallbacks报错', e);
        } finally {
            isFlushingSyncQueue = false;
            syncQueue = null;
        }
    }
}
