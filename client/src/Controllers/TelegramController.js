import { MTProto } from '@mtproto/core';

const mtproto = new MTProto({
    api_id: "1833242",
    api_hash: '1f3f3191040d421edfd049c8c3ff0d6d'
})

const api = {
    call(method, params, options = {}) {
      return mtproto.call(method, params, options).catch(async error => {
        console.log(`${method} error:`, error);
  
        const { error_code, error_message } = error;
  
        if (error_code === 303) {
          const [type, dcId] = error_message.split('_MIGRATE_');
  
          // If auth.sendCode call on incorrect DC need change default DC, because call auth.signIn on incorrect DC return PHONE_CODE_EXPIRED error
          if (type === 'PHONE') {
            await mtproto.setDefaultDc(+dcId);
          } else {
            options = {
              ...options,
              dcId: +dcId,
            };
          }
  
          return this.call(method, params, options);
        }
  
        return Promise.reject(error);
      });
    },
  };

export default api