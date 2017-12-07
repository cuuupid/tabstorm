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

# What is Bash?

Bash is both a **console** and a **Language**

**bash script.sh** will run script.sh

while **bash** will give you an interactive terminal

**bash** is one of the most basic of all languages and is important as it exists in the terminal

it is _key_ to navigating the console


# What is a terminal?

Terminal is what we use to output commands in commandline to the computer. This is useful for running programs without 
having to make a GUI.

Hyper is a custom designed terminal that was made using "Electron" which we will go over later

Why use commandline? --> Instead of using a mouse to click things, we can use commandline, pure keyboard, to instruct the
