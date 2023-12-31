import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { formDocument } from 'src/schemas/form.schema';
import { formSubmissionsDocument } from 'src/schemas/form.submissions.schema';
import { userDocument } from 'src/schemas/user.schema';
const { v4: uuidv4 } = require('uuid');
@Injectable()
export class UserFormService {
  constructor(
    @InjectModel('Form') private readonly formModel: Model<formDocument>,
    @InjectModel('FormSubmissions') private readonly formSubmissionsModel:Model<formSubmissionsDocument>,
    @InjectModel('User') private readonly userModel: Model<userDocument>,
  ) {}

  async geForms() {
    const findForms = await this.formModel.find();
    return findForms;
  }

  async getForm(formId: string) {
    const getForm = await this.formModel.findOne({ formId: formId });
    if (getForm) {
      return getForm;
    } else {
      throw new NotFoundException('No such form exist');
    }
  }

  async formSubmit(data, reqUser) {
  
    const findForm = await this.formModel.findOne({ formId: data.templateId });
    const findUser = await this.userModel.findOne({ _id: reqUser.userId });

    if (findForm) {
      let bufferObj = Buffer.from(findUser.email, 'utf8');
      let base64String = bufferObj.toString('base64');
      let newData =
       data.healthId.map((item) => {
        return { healthId: item,["id"]:uuidv4() }
      });
      const newForm = await this.formSubmissionsModel.create({
        userId:reqUser.userId,
        templateId:data.templateId,
        batchId: base64String,
        data:newData
      })
    }
  }
}
