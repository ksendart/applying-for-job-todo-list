# demoTODOList

<h3>Demo Application for Bitworks</h3>

This application implements TODO lists manager.
This manager allows to user creating new TODO list and editing existing lists.

This is Single Page Application supports routing between several views. Application includes 2 pages: the <i>main</i> page for displaying existing lists and creating new, and the <i>edittodo</i> page for editing list. Respectively, each page contains a table and a simple form. 

Application uses Firebase for data storing. Data are stored as json with simple structure. This application provides authorisation via Google, which supported by Firebase. Data are available by URL <i>https://demotodolist-ff08f.firebaseio.com/</i>.

<h3>Install</h3>

Clone this repository into your server (like XAMPP or other, I used XAMPP).
This application will be available by URL like <i>http://yourserver/demotodolist/</i>. Also certain TODO list will be available by URL like <i>http://yourserver/demotodolist/#/edittodo/key</i> where <i>key</i> is TODOList identifier.
