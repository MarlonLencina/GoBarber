import IStorageProvider from '../models/IStorageProvider';
import upload from '@config/upload';
import aws, { S3 } from 'aws-sdk';
import path from 'path';
import fs from 'fs';
import mime from 'mime-types';
import AppError from '@shared/errors/AppError';

export default class Amazons3Provider implements IStorageProvider {
    private client: S3;

    constructor() {
        this.client = new aws.S3({
            region: 'us-east-2',
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY,
        });
    }

    public async saveFile(file: string): Promise<string> {
        const originalPath = path.resolve(upload.tmpFolder, file);
        const fileContent = await fs.promises.readFile(originalPath);

        const fileExtension = mime.contentType(originalPath);

        if (!fileExtension) {
            throw new AppError('cannot find content type');
        }

        await this.client
            .putObject({
                Bucket: 'gobarbergostack11',
                Key: file,
                ACL: 'public-read',
                Body: fileContent,
                ContentType: fileExtension,
            })
            .promise();

        return file;
    }
    public async deleteFile(file: string): Promise<void> {
        await this.client
            .deleteObject({
                Bucket: 'gobarbergostack11',
                Key: file,
            })
            .promise();
    }
}
