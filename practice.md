_Welcome to my panic room._

# Breaking ReCaptcha with AI

- **case 1:** "click all images that show a storefront" (separate images)
	- analyze all images with Inception
    - extract what we're looking for ("storefront")
    - `if image.classes['storefront'] > epsilon then click image`
    	- epsilon linear threshold
    - "until none are left"
    	- wait til it disappears then keep going
- **case 2:** "choose all pictures that have signs" (one image segmented into matrix)
	- piece together image using cv
    - standardize with OpenCV
    - analyze image with inception
    - `if bounding_box.class == signs and bounding_box.probability > epsilon then draw box`
   		- epsilon linear threshold
    - box x / max x * cols, box y / max y * rows, int() it
    - pick box with these new directions 