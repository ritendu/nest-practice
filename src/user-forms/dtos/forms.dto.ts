import { ArrayNotEmpty, IsArray, IsNotEmpty, IsString } from "class-validator";

export class FormSubmitDto{
    @IsString()
    @IsNotEmpty()
    templateId:string;

    @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  healthId: string[];
}