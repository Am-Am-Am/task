import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDbDto, UpdateDbDto } from './dto/create-db.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class DbService {
  constructor(private readonly prisma:PrismaService){}

  async create(dto: CreateDbDto): Promise<{ success: boolean; result: any }> {
    try {
      const user = await this.prisma.users.create({
        data: dto,
      });
  
      return {
        success: true,
        result: {
          id: user.id,
        },
      };
    } catch (error) {
      return {
        success: false,
        result: { error: error.message || 'Internal server error' },
      };
    }
  }

  async findAll() {
    const users = await this.prisma.users.findMany();
    
    if (!users.length) {  
      return {  
          success: false,  
          result: {  
              error: "Пользователи не найдены."  
          }  
      };  
    }  

    return {
      success: true,
      result: {
        users: users.map(user => ({
          id: user.id,
          full_name: user.full_name,
          role: user.role,
          efficiency: user.efficiency
        }))
      }
    };
  }

  async getUserById(id: number, filters?: any) {
    try {
      let filterOptions = {};
      
      if (filters) {
        Object.keys(filters).forEach((key) => {
          filterOptions[key] = filters[key];
        });
      }

      const user = await this.prisma.users.findFirst({
        where: {
          id,
          ...filterOptions,
        },
      });

      if (!user) {
        return {
          success: false,
          result: { error: 'Пользователь не найден' },
        };
      }

      return {
        success: true,
        result: {
          users: [user], 
        },
      };
    } catch (error) {
      console.error('Error getting user:', error);
      return {
        success: false,
        result: { error: error.message || 'Internal server error' },
      };
    }
  }

  async getUsersByFilters(filters: any) {
    try {
      const users = await this.prisma.users.findMany({ where: filters });

      if (!users.length) {
        return {
          success: false,
          result: { error: 'Нет таких пользователей' },
        };
      }

      return {
        success: true,
        result: { users },
      };
    } catch (error) {
      return {
        success: false,
        result: { error: error.message || 'Internal server error' },
      };
    }
  }


  async update(id: number, dto: UpdateDbDto): Promise<{ success: boolean; result: any }> {
    try {
      const item = await this.prisma.users.findUnique({
        where: { id },
      });
  
      if (!item) {
        throw new NotFoundException(`Элемент с id ${id} не был найден`);
      }
  
      const updatedItem = await this.prisma.users.update({
        where: { id },
        data: dto,
      });
  
      return {
        success: true,
        result: updatedItem,
      };
    } catch (error) {
      console.error('Error updating user:', error);
      return {
        success: false,
        result: { error: error.message || 'Internal server error' },
      };
    }
  }

  async delete(id: number): Promise<{ success: boolean; result: any }> {
    try {
      const item = await this.prisma.users.findUnique({
        where: { id },
      });
  
      if (!item) {
        throw new NotFoundException(`Элемент с id ${id} не был найден`);
      }
  
      await this.prisma.users.delete({
        where: { id },
      });
  
      return {
        success: true,
        result: item,
      };
    } catch (error) {
      
      return {
        success: false,
        result: { error: error.message || 'Internal server error' },
      };
    }
  }
  
  async deleteAll() {
    await this.prisma.users.deleteMany({});
    return {
      success: true,
    };
  }
}
