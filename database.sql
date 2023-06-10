create database web;
use web;
create table User (
	id bigint auto_increment not null primary key,
    email varchar(100) unique not null,
    password varchar(255) not null,
    username varchar(100),
    role enum('ADMIN', 'USER'),
    salt varchar(255)
);
create table Token (
    user_id bigint unique not null primary key,
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
    name varchar(50) not null,
    description varchar(500),
    start_time date,
    end_time date,
    file_url varchar(255),
    assigned_id bigint not null,
    column_id bigint not null,
    workspace_id bigint not null,
    comment varchar(500),
    FOREIGN KEY (assigned_id) references User(id),
    FOREIGN KEY (column_id) references WColumn(id),
    FOREIGN KEY (workspace_id) references Workspace(id)
);
create table Notification (
	user_id bigint unique not null primary key,
    content varchar(500),
    created_at datetime not null,
    FOREIGN KEY (user_id) references User(id)
);
	show tables;
