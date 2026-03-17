import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export class UsersService {
  static async getUsers(emailContains?: string, nameContains?: string) {
    return UsersRepository.findAll(emailContains, nameContains);
  }

  static async getUserById(id: string) {
    return UsersRepository.findById(id);
  }

  static async getUserByEmail(email: string) {
    return UsersRepository.findByEmail(email);
  }

  static async createUser(data: CreateUserDto) {
    return UsersRepository.create({
      email: data.email,
      name: data.name ?? null,
    });
  }

  static async updateUser(data: UpdateUserDto) {
    return UsersRepository.update(data.id, {
      name: data.name ?? null,
    });
  }

  static async deleteUser(id: string) {
    return UsersRepository.delete(id);
  }
}
