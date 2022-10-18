import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { AppRepository } from './app.repository';
import { CreateProjectDto } from './dtos/create-project.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Injectable()
export class AppService {
  constructor(private readonly appRepository: AppRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    createUserDto.isGov = false;
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
    const projects = await this.appRepository.fetchProjects(city);
    return projects.map((project) => {
      const coords = { lat: project.lat, lng: project.lng };
      delete project.lng, project.lat;
      return { ...project, coords };
    });
  }

  async fetchProject(projectId: number, userId: number) {
    const data = await this.appRepository.fetchProject(projectId, userId);
    const coords = { lat: data.project.lat, lng: data.project.lng };
    delete data.project.lng, data.project.lat;
    return { ...data.project, voted: data.voted, coords };
  }

  async userLogin(loginUserDto: LoginUserDto) {
    const res = await this.appRepository.userLogin(loginUserDto);
    if (res) {
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

  async projectVote(projectId: number, userId: number) {
    return await this.appRepository.projectVote(projectId, userId);
  }

  async getSettings(userId: number) {
    return await this.appRepository.getSettings(userId);
  }

  async saveSettings(userId: number, theme: string) {
    return await this.appRepository.saveSettings(userId, theme);
  }
}
