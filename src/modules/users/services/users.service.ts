import { UsersRepository } from '../repositories';
import { CreateUserType, UpdateUserType } from '../schemas';

export class UsersService {
  static async getUsers(emailContains?: string, userNameContains?: string) {
    return UsersRepository.findAll(emailContains, userNameContains);
  }

  static async getUserById(id: string) {
    return UsersRepository.findById(id);
  }

  static async getUserByEmail(email: string) {
    return UsersRepository.findByEmail(email);
  }

  static async createUser(data: CreateUserType) {
    return UsersRepository.create({
      ...data,
    });
  }

  static async updateUser(data: UpdateUserType) {
    return UsersRepository.update(data.id, {
      ...data.data,
    });
  }

  static async deleteUser(id: string) {
    return UsersRepository.delete(id);
  }
}
