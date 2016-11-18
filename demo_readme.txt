Demo Application for Bitworks

This application implements TODO lists manager. This manager allows to user creating new TODO list and editing existing lists.

This is Single Page Application supports routing between several views. 
Application includes 2 pages: the main page for displaying existing lists and creating new, and the edittodo page for editing list.
Respectively, each page contains a table and a simple form.

Application uses Firebase for data storing. Data are stored as json with simple structure. 
This application provides authorisation via Google, which supported by Firebase. 
Data are available by URL https://demotodolist-ff08f.firebaseio.com/.

Install

Clone this repository into your server (like XAMPP or other, I used XAMPP). 
This application will be available by URL like http://yourserver/demotodolist/. 
Also certain TODO list will be available by URL like http://yourserver/demotodolist/#/edittodo/key where key is TODOList identifier.

Some additional information

I apologize for the late deadline. I worked on tasks under my contract. 
Nevertheless, I found time to learn AngularJS and FireBase slightly. It helped me implement test task. 
But I had some problem this second part of this task about parallel session detection. 
As I learned, AngularFire and FireBase (that I used) provide two operations for insert action: $save and $push. 
I started implementation with $push method. And when I started to implement second part, I found a article about it. 
This article said that: If the items don't have a natural key or you want them to be sorted "chronologically", 
you'll typically use push()/$add() to generate a key for you. This will ensure that the items are stored under a unique key and 
that newer items show up later in the list. So if you're working with users, you'll typically store then under their uid using 
something like ref.child('users').child(user.uid).set(user). On the other hand, if you're adding chat message to a chat room, you'll 
use something like ref.child('chat').push({ name: 'Adam Youngers', 'Firebase push() vs Angularfire $save()' }).

As I understood, using of $push frees me from checking parallel session in app. 
I know, that maybe it doesn't meet the test task requirements, by I suppose that it happens to be.

I suppose also that my app is not suitable for this test task according to your opinion. 
Anyway, I will be glad, if you allow me joining to your team not as junior-developer, but as trainee.

Thanks, my best regards.
