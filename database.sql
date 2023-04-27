create database web;
use web;
create table User (
	id bigint auto_increment not null primary key,
    email varchar(255) unique not null,
    password varchar(255) not null,
    username varchar(255),
    role enum('ADMIN', 'USER'),
    salt varchar(255)
);
create table Token (
	id bigint auto_increment not null primary key,
    user_id bigint unique not null,
    token varchar(255),
    FOREIGN KEY (user_id) references User(id)
);
create table Workspace (
	id bigint auto_increment not null primary key,
    name varchar(50)
);
create table Member (
	workspace_id bigint not null,
    user_id bigint not null,
    role enum('ADMIN', 'MEMBER'),
    FOREIGN KEY (workspace_id) references Workspace(id),
    FOREIGN KEY (user_id) references User(id)
);
create table WColumn (
	id bigint auto_increment not null primary key,
    name varchar(50) not null,
    workspace_id bigint not null,
    FOREIGN KEY (workspace_id) references Workspace(id)
);
create table Card (
	id bigint auto_increment not null primary key,
    description varchar(500),
    startTime datetime,
    endTime datetime,
    file_url varchar(255),
    assigned_id bigint not null,
    column_id bigint not null,
    comment varchar(500),
    FOREIGN KEY (assigned_id) references User(id),
    FOREIGN KEY (column_id) references WColumn(id)
);
create table Notification (
	user_id bigint unique not null primary key,
    content varchar(500),
    createdAt datetime not null,
    FOREIGN KEY (user_id) references User(id)
);
show tables;
