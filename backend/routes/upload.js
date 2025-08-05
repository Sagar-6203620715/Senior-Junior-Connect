import express from 'express';
import multer from 'multer';
import cloudinary from '../config/cloudinary.js';
import { protect, asyncHandler } from '../middleware/auth.js';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();

// File filter function
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, GIF, and WebP images are allowed.'), false);
  }
};

// Configure multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: parseInt(process.env.MAX_FILE_SIZE) || 5 * 1024 * 1024, // 5MB default
    files: 1
  },
  fileFilter: fileFilter
});

// @desc    Upload profile picture
// @route   POST /api/upload/profile-picture
// @access  Private
router.post('/profile-picture', protect, upload.single('image'), asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({
      status: 'error',
      message: 'Please upload an image file'
    });
  }

  try {
    // Convert buffer to base64
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const dataURI = `data:${req.file.mimetype};base64,${b64}`;

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: 'engiconnect/profile-pictures',
      public_id: `user_${req.user._id}_${Date.now()}`,
      transformation: [
        { width: 400, height: 400, crop: 'fill', gravity: 'face' },
        { quality: 'auto', fetch_format: 'auto' }
      ],
      overwrite: true
    });

    // Update user profile picture
    const User = (await import('../models/User.js')).default;
    await User.findByIdAndUpdate(req.user._id, {
      profilePicture: result.secure_url
    });

    res.json({
      status: 'success',
      message: 'Profile picture uploaded successfully',
      data: {
        url: result.secure_url,
        publicId: result.public_id
      }
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to upload image'
    });
  }
}));

// @desc    Upload college images
// @route   POST /api/upload/college-images
// @access  Private
router.post('/college-images', protect, upload.array('images', 5), asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Please upload at least one image file'
    });
  }

  try {
    const uploadedImages = [];

    for (const file of req.files) {
      // Convert buffer to base64
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataURI = `data:${file.mimetype};base64,${b64}`;

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'engiconnect/college-images',
        public_id: `college_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        transformation: [
          { width: 1200, height: 800, crop: 'fill' },
          { quality: 'auto', fetch_format: 'auto' }
        ]
      });

      uploadedImages.push({
        url: result.secure_url,
        publicId: result.public_id
      });
    }

    res.json({
      status: 'success',
      message: 'Images uploaded successfully',
      data: {
        images: uploadedImages
      }
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to upload images'
    });
  }
}));

// @desc    Upload chat images
// @route   POST /api/upload/chat-images
// @access  Private
router.post('/chat-images', protect, upload.array('images', 10), asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Please upload at least one image file'
    });
  }

  try {
    const uploadedImages = [];

    for (const file of req.files) {
      // Convert buffer to base64
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataURI = `data:${file.mimetype};base64,${b64}`;

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'engiconnect/chat-images',
        public_id: `chat_${req.user._id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        transformation: [
          { width: 800, height: 600, crop: 'limit' },
          { quality: 'auto', fetch_format: 'auto' }
        ]
      });

      uploadedImages.push({
        url: result.secure_url,
        publicId: result.public_id,
        name: file.originalname,
        size: file.size,
        mimeType: file.mimetype
      });
    }

    res.json({
      status: 'success',
      message: 'Images uploaded successfully',
      data: {
        images: uploadedImages
      }
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to upload images'
    });
  }
}));

// @desc    Upload documents
// @route   POST /api/upload/documents
// @access  Private
router.post('/documents', protect, upload.array('documents', 5), asyncHandler(async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Please upload at least one document'
    });
  }

  // Configure multer for documents
  const documentFilter = (req, file, cb) => {
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only PDF, DOC, DOCX, TXT, XLS, and XLSX files are allowed.'), false);
    }
  };

  const documentUpload = multer({
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB for documents
      files: 5
    },
    fileFilter: documentFilter
  });

  try {
    const uploadedDocuments = [];

    for (const file of req.files) {
      // Convert buffer to base64
      const b64 = Buffer.from(file.buffer).toString('base64');
      const dataURI = `data:${file.mimetype};base64,${b64}`;

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataURI, {
        folder: 'engiconnect/documents',
        public_id: `doc_${req.user._id}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        resource_type: 'raw'
      });

      uploadedDocuments.push({
        url: result.secure_url,
        publicId: result.public_id,
        name: file.originalname,
        size: file.size,
        mimeType: file.mimetype
      });
    }

    res.json({
      status: 'success',
      message: 'Documents uploaded successfully',
      data: {
        documents: uploadedDocuments
      }
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to upload documents'
    });
  }
}));

// @desc    Delete uploaded file
// @route   DELETE /api/upload/:publicId
// @access  Private
router.delete('/:publicId', protect, asyncHandler(async (req, res) => {
  const { publicId } = req.params;

  try {
    // Delete from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result === 'ok') {
      res.json({
        status: 'success',
        message: 'File deleted successfully'
      });
    } else {
      res.status(400).json({
        status: 'error',
        message: 'Failed to delete file'
      });
    }
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to delete file'
    });
  }
}));

// @desc    Get upload statistics
// @route   GET /api/upload/stats
// @access  Private
router.get('/stats', protect, asyncHandler(async (req, res) => {
  try {
    // Get Cloudinary usage statistics
    const result = await cloudinary.api.usage();

    res.json({
      status: 'success',
      data: {
        plan: result.plan,
        objects: result.objects,
        bandwidth: result.bandwidth,
        storage: result.storage,
        requests: result.requests,
        resources: result.resources,
        derived_resources: result.derived_resources
      }
    });
  } catch (error) {
    console.error('Cloudinary stats error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to get upload statistics'
    });
  }
}));

// Error handling middleware for multer
router.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        status: 'error',
        message: 'File too large'
      });
    }
    if (error.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({
        status: 'error',
        message: 'Too many files'
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({
        status: 'error',
        message: 'Unexpected file field'
      });
    }
  }

  if (error.message.includes('Invalid file type')) {
    return res.status(400).json({
      status: 'error',
      message: error.message
    });
  }

  next(error);
});

export default router; 