import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AppRepository } from './app.repository';
import { CreateProjectDto } from './dtos/create-project.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    return await this.appRepository.createUser(createUserDto);
  }

  async createProject(createProjectDto: CreateProjectDto) {
    return await this.appRepository.createProject(createProjectDto);
  }

  async deleteUser(userId: number) {
    return await this.appRepository.deleteUser(userId);
  }

  async deleteProject(projectId: number) {
    return await this.appRepository.deleteProject(projectId);
  }

  async approveProject(projectId: number) {
    return await this.appRepository.approveProject(projectId);
  }

  async fetchProjects(city) {
    return await this.appRepository.fetchProjects(city);
  }

  async fetchProject(projectId: number) {
    return await this.appRepository.fetchProject(projectId);
  }

  async userLogin(loginUserDto: LoginUserDto) {
    const res = await this.appRepository.userLogin(loginUserDto);
    if (!res.phone) {
      const censor_phone = res.phone.split('');
      for (let i = 4; i < res.phone.length - 2; i++) {
        if (censor_phone[i] == ' ') {
          i++;
        }
        censor_phone[i] = '*';
      }
      res.phone = censor_phone.join('');
    }

    return res;
  }

  async projectVote(projectId) {
    return await this.appRepository.projectVote(projectId);
  }

  async getSettings(userId: number) {
    return await this.appRepository.getSettings(userId);
  }

  async saveSettings(userId: number, theme: string) {
    return await this.appRepository.saveSettings(userId, theme);
  }
}
