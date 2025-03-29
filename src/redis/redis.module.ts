import { Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { createClient } from 'redis';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: 'REDIS_CLIENT',
      async useFactory() {
        const client = createClient({
            socket: {
                host: "localhost",
                port:6379,
                 family: 4, // 强制IPv4协议栈
                
            },
            password: "123456", 
            database: 0
        });
         // 添加错误监听
        client.on('error', (err) => {
          console.error('Redis Client Error:', err);
        });

        // 添加连接成功回调
        client.on('connect', () => {
          console.log('Redis connection established');
        });
        await client.connect();
        return client;
      }
    }
  ],
  exports: [RedisService]
})
export class RedisModule {}