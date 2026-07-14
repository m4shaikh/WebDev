import cloudinary
import cloudinary.uploader
from cloudinary import CloudinaryImage
from dotenv import load_dotenv
import os
load_dotenv()

# 1. Configure Cloudinary
cloudinary.config(
    cloud_name = os.getenv('CLOUD_NAME'),
    api_key = os.getenv('API_KEY'),
    api_secret = os.getenv('API_SECRET'),
    secure = os.getenv('SECURE')
)

print("Uploading image...")
# 2. Upload an image
upload_result = cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/sample.jpg")

print(f"Secure URL: {upload_result.get('secure_url')}")
print(f"Public ID: {upload_result.get('public_id')}")

# 3. Get image details
print("\nImage Details:")
print(f"Width: {upload_result.get('width')}px")
print(f"Height: {upload_result.get('height')}px")
print(f"Format: {upload_result.get('format')}")
print(f"File size: {upload_result.get('bytes')} bytes")

# 4. Transform the image
# f_auto: Automatically chooses the most optimized format (like WebP or AVIF) based on the user's browser.
# q_auto: Automatically adjusts compression quality to minimize file size without visible degradation.
transformed_url = CloudinaryImage(upload_result.get('public_id')).build_url(fetch_format="auto", quality="auto")

print("\nDone! Click link below to see optimized version of the image. Check the size and the format.")
print(transformed_url)