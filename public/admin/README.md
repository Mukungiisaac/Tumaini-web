# Tumaini CMS Admin Dashboard

The admin dashboard interface for managing Tumaini school content.

## Quick Start

1. Ensure the backend server is running on `http://localhost:3001`

2. Open the login page:
```
http://localhost:3001/admin/login.html
```

3. Default credentials:
   - Email: `admin@tumaini.school`
   - Password: `Admin123!`

4. You'll be redirected to the dashboard

## Dashboard Overview

The admin dashboard is organized into several sections:

### Dashboard
- Overview of site statistics
- Recent activity
- Quick links to common tasks

### Homepage
- Hero section content (title, description, image, buttons)
- Statistics (students, pass rate, residence children, awards)
- All changes appear live on the public homepage

### About Us
- School history
- Mission and vision
- Core values
- Leadership information
- Gallery images

### Admissions
- Admission information
- Requirements
- Available classes
- Application instructions
- Important dates
- Publish/unpublish content

### Children's Home
- Program descriptions
- Activities and impact
- Statistics
- Support information
- Images

### News
- Create, edit, delete news articles
- Rich text editor for content
- Featured image upload
- Categories and status (draft/published)
- Article slug generation
- Publication dates

### Gallery
- Upload multiple images
- Organize images by category
- Edit image titles and descriptions
- Publish/unpublish images
- Delete images

### Get Involved
- Donation information
- Volunteer opportunities
- Partnership details
- Sponsorship information
- Support methods

### Contact
- Phone numbers
- Email addresses
- Physical address
- Office hours
- Social media links
- Google Maps location

### Settings
- Site-wide settings
- School name, logo, etc.
- Metadata

## Security Features

- JWT-based authentication
- Automatic logout on token expiration
- Secure password storage (bcryptjs hashing)
- Protected admin routes
- Session persistence with localStorage

## Features

### Content Management
- Create, read, update, delete (CRUD) operations
- Draft and publish workflow
- Bulk operations on gallery images
- Rich text editing for articles

### Media Management
- Upload images directly from dashboard
- Organize images by category
- Image validation
- Automatic thumbnail generation

### User Experience
- Responsive design works on desktop, tablet, mobile
- Confirmation dialogs for destructive actions
- Real-time validation
- Loading states for better UX
- Success/error notifications

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Keyboard Shortcuts

Coming soon in future updates:
- `Ctrl/Cmd + S` - Save form
- `Escape` - Close dialogs
- `Ctrl/Cmd + K` - Quick search

## API Integration

The dashboard communicates with the backend via REST API:

```javascript
const apiUrl = 'http://localhost:3001';
const token = localStorage.getItem('authToken');

// Example: Creating a news article
fetch(`${apiUrl}/api/news`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    title: 'Article Title',
    category: 'News',
    content: 'Article content...',
    status: 'draft'
  })
});
```

## Troubleshooting

### "You are not authorized"
- Your login session expired
- Clear localStorage and login again
- Check browser console for token issues

### Backend connection error
- Ensure backend server is running on port 3001
- Check CORS configuration in backend
- Verify network connectivity

### Images not uploading
- Check file size (max 5MB)
- Verify file type is image (JPG, PNG, GIF, WebP)
- Check backend uploads folder permissions

### Changes not appearing on public site
- Ensure content is "published" (not draft)
- Refresh public website browser cache
- Wait a few seconds for API sync

## File Structure

```
admin/
├── login.html            # Login page
├── dashboard.html        # Main dashboard
├── pages/               # Page management
├── assets/             # Static files
└── README.md
```

## Performance Tips

- Use compressed images before uploading
- Delete unused news articles and images
- Clear browser cache regularly
- Use modern browser for best performance

## Next Steps

After initial setup:

1. Change the default admin password
2. Upload school logo and favicon
3. Populate homepage with latest information
4. Create initial news articles
5. Upload gallery images
6. Test all public pages to verify content appears correctly

## Support

For issues or feature requests, contact the development team.
