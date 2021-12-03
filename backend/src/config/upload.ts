import path from 'path';
import multer, { StorageEngine } from 'multer';
import crypto from 'crypto';

const tmpFolder = path.resolve(__dirname, '../', '../', 'temp');

interface IUploadConfig {
    driver: string;
    tmpFolder: string;
    uploadsFolder: string;
    multer: {
        storage: StorageEngine;
    };
    config: {
        disk: {};
        aws: {
            bucket: string;
        };
    };
}

const uploadConfig = {
    driver: 's3',
    tmpFolder,
    uploadsFolder: 'uploads',
    multer: {
        storage: multer.diskStorage({
            destination: tmpFolder,
            filename(request, file, callback) {
                const fileHash = crypto.randomBytes(10).toString('HEX');
                const fileName = `${fileHash}-${file.originalname}`;

                return callback(null, fileName);
            },
        }),
    },
    config: {
        disk: {},
        aws: {
            bucket: process.env.AWS_BUCKET,
        },
    },
} as IUploadConfig;

export default uploadConfig;
