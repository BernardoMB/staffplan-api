create TABLE TIMELINE_OPTION (
    `ID` int(11) NOT NULL AUTO_INCREMENT,
    TIMELINE_NAME varchar(255) not null,
      PRIMARY KEY (`ID`)
)

insert into TIMELINE_OPTION (TIMELINE_NAME) values ('This Week');
insert into TIMELINE_OPTION (TIMELINE_NAME) values ('Upcoming Week');
insert into TIMELINE_OPTION (TIMELINE_NAME) values ('30 Days');
insert into TIMELINE_OPTION (TIMELINE_NAME) values ('60 Days');
insert into TIMELINE_OPTION (TIMELINE_NAME) values ('90 Days');

select * from TIMELINE_OPTION
