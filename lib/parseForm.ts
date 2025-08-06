import formidable from 'formidable';
import { IncomingMessage } from 'http';
import { writeFile } from 'fs/promises';
import path from 'path';

export const parseForm = async (req: IncomingMessage): Promise<{ fields: any; files: any }> => {
  const uploadDir = path.join(process.cwd(), 'public/uploads');

  const form = formidable({
    multiples: false,
    uploadDir,
    keepExtensions: true,
    filename: (name, ext, part) => {
      const timestamp = Date.now();
      const uniqueName = `${timestamp}_${part.originalFilename}`;
      return uniqueName.replace(/\s+/g, '_');
    },
  });

  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });
};
