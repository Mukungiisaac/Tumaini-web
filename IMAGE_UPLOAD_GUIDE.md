# Image Upload Feature - User Guide

## Overview
You can now upload images directly from your computer in the homepage CMS editor. Images are automatically saved to the `assets/images/` folder with proper styling and alignment.

---

## Where Can You Upload Images?

### 1. Holistic Approach Section
**Tab:** Holistic Approach  
**Field:** Section Image  
**Usage:** Main image for the "Holistic Approach to Learning" section  
**Display:** Large section image with rounded corners (rounded-3xl)  
**Aspect Ratio:** 4:3 or auto  
**Recommended Size:** 1200x900px minimum  

### 2. Testimonial Author Photo
**Tab:** Testimonial  
**Field:** Author Image  
**Usage:** Profile photo of testimonial author  
**Display:** Circular image with gold border  
**Size:** 64x64px (w-16 h-16)  
**Recommended Size:** 400x400px square minimum  

---

## How to Upload Images

### Step-by-Step Instructions:

1. **Navigate to Homepage Editor**
   - Login to admin dashboard
   - Click "Homepage" in sidebar

2. **Go to the Section**
   - Click on the tab where you want to upload an image:
     - "Holistic Approach" tab for section image
     - "Testimonial" tab for author photo

3. **Click Upload Button**
   - Look for the golden "Upload Image" or "Upload Photo" button
   - Click on it to open file browser

4. **Select Your Image**
   - Choose an image from your computer
   - Supported formats: JPG, JPEG, PNG, GIF, WebP
   - Max file size: 5MB

5. **Preview**
   - Image preview appears immediately after upload
   - **Holistic section:** Shows full-width preview with rounded corners
   - **Testimonial:** Shows circular preview with gold border

6. **Path Auto-Updated**
   - The image path field automatically fills with the new path
   - Example: `assets/images/your-image-1234567890.jpg`

7. **Save Changes**
   - Click "Save All Changes" button at top
   - Your uploaded image is now live on the public homepage!

---

## Image Specifications

### File Requirements:

| Requirement | Details |
|-------------|---------|
| **Formats** | JPG, JPEG, PNG, GIF, WebP |
| **Max Size** | 5MB per image |
| **Min Size** | No minimum (but larger is better for quality) |

### Recommended Sizes:

| Section | Recommended Size | Aspect Ratio | Notes |
|---------|-----------------|--------------|-------|
| **Holistic Section** | 1200x900px | 4:3 | Will be cropped to fit container |
| **Testimonial Photo** | 400x400px | 1:1 (Square) | Will be displayed as circle |

### Image Styling:

**Holistic Section Image:**
- Border radius: `rounded-3xl` (24px)
- Shadow: `shadow-lg`
- Aspect ratio: 4:3 on mobile, auto on desktop
- Object fit: `cover` (fills container while maintaining aspect ratio)

**Testimonial Photo:**
- Shape: Perfect circle (`rounded-full`)
- Border: 2px solid gold (`border-2 border-brand-gold`)
- Shadow: `shadow-md`
- Size: 64x64px on page (w-16 h-16)

---

## Upload Process (Technical)

### What Happens When You Upload:

1. **Validation:**
   - File type is checked (must be image)
   - File size is checked (max 5MB)

2. **Upload:**
   - Image is sent to backend server
   - Unique filename is generated (prevents conflicts)
   - Image is saved to `assets/images/` folder

3. **Response:**
   - Backend returns the new image path
   - Preview appears in editor
   - Path field auto-fills

4. **Save:**
   - When you click "Save All Changes"
   - Image path is saved to database
   - Public homepage loads the new image

### Filename Format:
```
originalname-timestamp-random.ext
Example: my-photo-1695123456789-987654321.jpg
```

---

## Troubleshooting

### Problem: "Only image files are allowed"
**Cause:** File type not supported  
**Solution:** Use JPG, PNG, GIF, or WebP format only

### Problem: "Image size must be less than 5MB"
**Cause:** File is too large  
**Solution:** 
- Compress image using tools like TinyPNG.com
- Resize image to recommended dimensions
- Use JPEG format for photos (smaller than PNG)

### Problem: Upload button shows spinning icon forever
**Cause:** Backend not running or upload failed  
**Solution:**
1. Check backend is running: `cd backend && npm start`
2. Check browser console (F12) for errors
3. Try refreshing the page and uploading again

### Problem: Image uploaded but doesn't appear on public page
**Cause:** Forgot to save or cache issue  
**Solution:**
1. Make sure you clicked "Save All Changes"
2. Wait for success message
3. Hard refresh public page: `Ctrl + Shift + R`

### Problem: Image appears distorted
**Cause:** Wrong aspect ratio  
**Solution:**
- **Holistic section:** Use landscape images (4:3 ratio)
- **Testimonial:** Use square images (1:1 ratio)

### Problem: "Failed to upload image"
**Cause:** Server error or permission issue  
**Solution:**
1. Check backend terminal for errors
2. Verify `assets/images/` folder exists
3. Check folder permissions (should be writable)

---

## Best Practices

### Image Quality:
✅ **DO:**
- Use high-resolution images (at least recommended size)
- Compress images before uploading (TinyPNG, ImageOptim)
- Use descriptive filenames before uploading
- Test image on different screen sizes

❌ **DON'T:**
- Use extremely large files (>5MB)
- Use low-resolution images (<400px)
- Use portrait images for landscape sections
- Upload images with sensitive/private information

### Performance:
- Keep images under 500KB if possible
- Use WebP format for best compression (if supported)
- Use JPEG for photos, PNG for graphics with transparency

### Accessibility:
- Use clear, professional photos
- Ensure good contrast and lighting
- Avoid text-heavy images (use actual text instead)

---

## Advanced: Manual Path Entry

You can also manually enter image paths instead of uploading:

1. Place your image in `assets/images/` folder manually
2. In the editor, type the path in the text field:
   ```
   assets/images/your-image-name.jpg
   ```
3. Click "Save All Changes"

**When to use manual entry:**
- Image already exists in assets folder
- Bulk uploading images via FTP/file manager
- Using images from elsewhere in the project

---

## File Management

### Where Images Are Stored:
```
Tumaini-web/
  └── assets/
      └── images/
          ├── your-uploaded-image-123.jpg
          ├── another-image-456.png
          └── testimonial-789.jpg
```

### Deleting Uploaded Images:
Images are NOT automatically deleted when you change them. To clean up:

1. **Via Admin (Future Feature):**
   - Image library management coming soon

2. **Manual Deletion:**
   - Navigate to `assets/images/` folder
   - Delete unused image files manually
   - Or use File Manager in hosting control panel

### Backup:
- Uploaded images are saved to your project folder
- Backup `assets/images/` folder regularly
- Include in your project backups

---

## API Reference (For Developers)

### Upload Endpoint:
```
POST /api/upload
Authorization: Bearer <token>
Content-Type: multipart/form-data

Body: image file (key: "image")

Response:
{
  "success": true,
  "message": "Image uploaded successfully",
  "filename": "photo-1695123456789-987654321.jpg",
  "path": "assets/images/photo-1695123456789-987654321.jpg",
  "size": 245678,
  "mimetype": "image/jpeg"
}
```

### List Images:
```
GET /api/upload/images
Authorization: Bearer <token>

Response:
{
  "images": [
    {
      "filename": "photo.jpg",
      "path": "assets/images/photo.jpg",
      "url": "/assets/images/photo.jpg"
    }
  ]
}
```

### Delete Image:
```
DELETE /api/upload/:filename
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Image deleted successfully",
  "filename": "photo.jpg"
}
```

---

## Examples

### Example 1: Upload Holistic Section Image

1. Go to: Admin Dashboard → Homepage → Holistic Approach tab
2. Scroll to "Section Image"
3. Click "Upload Image" (golden button)
4. Select: `classroom-students.jpg` (1200x900px, 450KB)
5. Preview appears showing rounded image
6. Path field shows: `assets/images/classroom-students-1695123456789.jpg`
7. Click "Save All Changes"
8. Visit public homepage → Holistic section shows new image!

### Example 2: Upload Testimonial Photo

1. Go to: Admin Dashboard → Homepage → Testimonial tab
2. Scroll to "Author Image"
3. Click "Upload Photo" (golden button)
4. Select: `parent-headshot.jpg` (500x500px, 150KB)
5. Preview appears as circular photo with gold border
6. Path field auto-fills
7. Click "Save All Changes"
8. Visit public homepage → Testimonial shows new author photo!

---

## Support

### Getting Help:
- Check browser console (F12) for detailed error messages
- Check backend terminal for server errors
- Review `HOMEPAGE_CMS_TESTING_GUIDE.md` for general CMS testing
- Ensure backend is running before uploading

### Common Error Messages:

| Error | Meaning | Solution |
|-------|---------|----------|
| "Only image files are allowed" | Wrong file type | Use JPG/PNG/GIF/WebP |
| "Image size must be less than 5MB" | File too large | Compress or resize image |
| "Failed to upload image" | Server error | Check backend is running |
| "No file uploaded" | No file selected | Select an image file |

---

## Summary

✅ **You Can Now:**
- Upload images from your computer
- See instant previews with proper styling
- Auto-fill image paths
- Images saved to `assets/images/` folder
- Images automatically styled with correct border radius, shadows, and sizing

✅ **Supported Sections:**
- Holistic Approach section image (landscape, rounded corners)
- Testimonial author photo (square, circular display)

✅ **Benefits:**
- No need to manually upload via FTP
- No need to type image paths
- Instant visual preview
- Proper styling automatically applied
- Professional, streamlined workflow

🎉 **Start uploading images directly from the CMS!**
