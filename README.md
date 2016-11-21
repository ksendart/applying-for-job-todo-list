# demoTODOList

<h3>Demo Application for Bitworks</h3>

This application implements TODO lists manager.
This manager allows to user creating new TODO list and editing existing lists.

This is Single Page Application supports routing between several views. Application includes 2 pages: the <i>main</i> page for displaying existing lists and creating new, and the <i>edittodo</i> page for editing list. Respectively, each page contains a table and a simple form. 

Application uses Firebase for data storing. Data are stored as json with simple structure. This application provides authorisation via Google, which supported by Firebase. Data are available by URL <i>https://demotodolist-ff08f.firebaseio.com/</i>.

<h3>Install</h3>

Clone this repository into your server (like XAMPP or other, I used XAMPP).
This application will be available by URL like <i>http://yourserver/demotodolist/</i>. Also certain TODO list will be available by URL like <i>http://yourserver/demotodolist/#/edittodo/key</i> where <i>key</i> is TODOList identifier.

<h3>Some additional information</h3>

According to your tracklist I changed my application. In last revision I added input validation. Inputs are checked for empty value and special characters content. 
Thanks to your prompt, I implemented step and list adding. Before performing the insert operation application checks the existing value in DB by attribute step. If this step exist, then application suggest user to rewrite action for this step or to abort operation. For duplicative key application suggest to type another key.
I tried to use service as you suggested. I suppose that I used the service not quite right, but this syntax allow me to use <i>$timeout</i>. 
Also I added <i>css</i> based on <i>Bootstrap</i>. I never used it before, but it was so interesting to know something new again. 
I apologize for my code format. Hope that it looks more readable and good now.

I suppose also that my app is not suitable for this test task according to your opinion. Anyway, I will be glad, if you allow me joining to your team not as junior-developer, but as trainee. 

Thanks, my best regards.
