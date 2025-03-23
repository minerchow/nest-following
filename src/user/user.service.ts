import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  @InjectEntityManager()
  entityManager: EntityManager;
  
  async initData() {    
      const user2 = new User();
      user2.name = '李四';
  
      const user3 = new User();
      user3.name = '王五';
  
      const user4 = new User();
      user4.name = '赵六';
  
      const user5 = new User();
      user5.name = '刘七';
  
      await this.entityManager.save(user2);
      await this.entityManager.save(user3);
      await this.entityManager.save(user4);
      await this.entityManager.save(user5);
  
      const user1 = new User();
      user1.name = '张三';
  
      user1.followers = [user2, user3, user4];
  
      user1.following = [user2, user5];
  
      await this.entityManager.save(user1);
  }
}
