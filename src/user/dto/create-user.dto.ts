import {
  IsEmail,
  IsPositive,
  IsString,
  Matches,
  matches,
  Max,
  MaxLength,
  maxLength,
  MinLength,
} from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto extends User {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  username!: string;

  @IsPositive()
  document!: number;

  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password to weak: chose a stroger one!',
  })
  password: string;
}
