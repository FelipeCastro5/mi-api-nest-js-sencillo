import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class PreguntaDto {
  @ApiProperty({
    description: 'Pregunta que el usuario desea realizar en relación a la base de datos.',
    example: '¿Cuál es el total producido en los manifiestos del mes pasado?',
    maxLength: 500,
  })
  @IsString()
  @IsNotEmpty({ message: 'La pregunta no puede estar vacía' })
  @MaxLength(500, { message: 'La pregunta no puede exceder los 500 caracteres' })
  pregunta: string;
}
