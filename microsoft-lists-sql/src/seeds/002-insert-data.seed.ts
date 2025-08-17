import { DataSource } from 'typeorm';

export async function insertData(dataSource: DataSource): Promise<void> {
  console.log('>>> Inserting data into all tables...');

  try {
    await dataSource.query('DELETE FROM TrashItem');
    await dataSource.query('DELETE FROM ObjectType');
    await dataSource.query('DELETE FROM FileAttachment');
    await dataSource.query('DELETE FROM ShareLinkUserAccess');
    await dataSource.query('DELETE FROM ShareLinkOptionValue');
    await dataSource.query('DELETE FROM ShareLinkOption');
    await dataSource.query('DELETE FROM ShareLink');
    await dataSource.query('DELETE FROM Scope');
    await dataSource.query('DELETE FROM ListMemberPermission');
    await dataSource.query('DELETE FROM Permission');
    await dataSource.query('DELETE FROM ListRowComment');
    await dataSource.query('DELETE FROM ListCellValue');
    await dataSource.query('DELETE FROM ListRow');
    await dataSource.query('DELETE FROM ListColumnObject');
    await dataSource.query('DELETE FROM ListViewSetting');
    await dataSource.query('DELETE FROM ListColumnSettingValue');
    await dataSource.query('DELETE FROM ListDynamicColumn');
    await dataSource.query('DELETE FROM SystemColumnSettingValue');
    await dataSource.query('DELETE FROM SystemColumn');
    await dataSource.query('DELETE FROM ListView');
    await dataSource.query('DELETE FROM AccountList');
    await dataSource.query('DELETE FROM FavoriteList');
    await dataSource.query('DELETE FROM List');
    await dataSource.query('DELETE FROM TemplateColumnObject');
    await dataSource.query('DELETE FROM TemplateSampleCellValue');
    await dataSource.query('DELETE FROM TemplateSampleRow');
    await dataSource.query('DELETE FROM TemplateViewSetting');
    await dataSource.query('DELETE FROM TemplateColumn');
    await dataSource.query('DELETE FROM DataTypeSettingKey');
    await dataSource.query('DELETE FROM KeySetting');
    await dataSource.query('DELETE FROM SystemDataType');
    await dataSource.query('DELETE FROM TemplateView');
    await dataSource.query('DELETE FROM ViewTypeSetting');
    await dataSource.query('DELETE FROM ViewSetting');
    await dataSource.query('DELETE FROM ViewType');
    await dataSource.query('DELETE FROM ListTemplate');
    await dataSource.query('DELETE FROM TemplateProvider');
    await dataSource.query('DELETE FROM ListType');
    await dataSource.query('DELETE FROM AccountWorkspace');
    await dataSource.query('DELETE FROM Workspace');
    await dataSource.query('DELETE FROM Account');

    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="TrashItem"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="ObjectType"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="FileAttachment"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="ShareLinkUserAccess"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="ShareLinkOptionValue"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="ShareLinkOption"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="ShareLink"',
    );
    await dataSource.query('DELETE FROM sqlite_sequence WHERE name="Scope"');
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="ListMemberPermission"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="Permission"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="ListRowComment"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="ListCellValue"',
    );
    await dataSource.query('DELETE FROM sqlite_sequence WHERE name="ListRow"');
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="ListColumnObject"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="ListViewSetting"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="ListColumnSettingValue"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="ListDynamicColumn"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="SystemColumnSettingValue"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="SystemColumn"',
    );
    await dataSource.query('DELETE FROM sqlite_sequence WHERE name="ListView"');
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="AccountList"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="FavoriteList"',
    );
    await dataSource.query('DELETE FROM sqlite_sequence WHERE name="List"');
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="TemplateColumnObject"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="TemplateSampleCellValue"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="TemplateSampleRow"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="TemplateViewSetting"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="TemplateColumn"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="DataTypeSettingKey"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="KeySetting"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="SystemDataType"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="TemplateView"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="ViewTypeSetting"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="ViewSetting"',
    );
    await dataSource.query('DELETE FROM sqlite_sequence WHERE name="ViewType"');
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="ListTemplate"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="TemplateProvider"',
    );
    await dataSource.query('DELETE FROM sqlite_sequence WHERE name="ListType"');
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="AccountWorkspace"',
    );
    await dataSource.query(
      'DELETE FROM sqlite_sequence WHERE name="Workspace"',
    );
    await dataSource.query('DELETE FROM sqlite_sequence WHERE name="Account"');

    console.log('>>> Old data cleared successfully!');

    await dataSource.query(`
      INSERT INTO Account 
        (FirstName, LastName, Email, AccountPassword, Avatar, Company, AccountRole, AccountStatus) 
      VALUES 
        ('John', 'Doe', 'john.doe@example.com', 'password123', 'https://example.com/avatars/john.jpg', 'Tech Corp', 'Admin', 'Active'),
        ('Jane', 'Smith', 'jane.smith@example.com', 'password456', 'https://example.com/avatars/jane.jpg', 'Design Studio', 'User', 'Active'),
        ('Mike', 'Johnson', 'mike.johnson@example.com', 'password789', NULL, 'Marketing Inc', 'Manager', 'Active'),
        ('Sarah', 'Wilson', 'sarah.wilson@example.com', 'password101', 'https://example.com/avatars/sarah.jpg', 'Dev Agency', 'User', 'Active'),
        ('Tom', 'Brown', 'tom.brown@example.com', 'password202', NULL, 'Startup Inc', 'Admin', 'Inactive')
    `);

    await dataSource.query(`
      INSERT INTO 
        Workspace (WorkspaceName, Icon) 
      VALUES 
        ('Tech Workspace', 'icon_1'),
        ('Design Hub', 'icon_2'),
        ('Marketing Central', 'icon_3'),
        ('Development Lab', 'icon_4'),
        ('General Office', 'icon_5')
    `);

    await dataSource.query(`
      INSERT INTO 
        AccountWorkspace (AccountId, WorkspaceId) 
      VALUES 
        (1, 1), -- John Doe -> Tech Workspace
        (1, 4), -- John Doe -> Development Lab
        (2, 2), -- Jane Smith -> Design Hub
        (2, 5), -- Jane Smith -> General Office
        (3, 3), -- Mike Johnson -> Marketing Central
        (3, 5), -- Mike Johnson -> General Office
        (4, 1), -- Sarah Wilson -> Tech Workspace
        (4, 4), -- Sarah Wilson -> Development Lab
        (5, 1), -- Tom Brown -> Tech Workspace
        (5, 2)  -- Tom Brown -> Design Hub
    `);

    await dataSource.query(`
      INSERT INTO 
        ListType (Title, Icon, HeaderImage, ListTypeDescription) 
      VALUES 
        ('List', 'list_icon', 'http://example.com/images/list_header.png', 'Categorize items, track, assign and more.'),
        ('Form', 'form_icon', 'http://example.com/images/form_header.png', 'Collect structured data via form submissions.'),
        ('Gallery', 'gallery_icon', 'http://example.com/images/gallery_header.png', 'Visual display of items in card format.'),
        ('Calendar', 'calendar_icon', 'http://example.com/images/calendar_header.png', 'Manage and schedule time-based events.'),
        ('Board', 'board_icon', 'http://example.com/images/board_header.png', 'Organize items using Kanban-style workflow.');
    `);

    await dataSource.query(`
      INSERT INTO 
        TemplateProvider (ProviderName) 
      VALUES 
        ('Microsoft'),
        ('Company');
    `);

    await dataSource.query(`
      INSERT INTO 
        ListTemplate (Title, HeaderImage, TemplateDescription, Icon, Color, Summary, Feature, ListTypeId, TemplateProviderId) 
      VALUES 
        ('Issue tracker', 'https://example.com/issue-tracker.jpg', 'Track and resolve issues efficiently.', 'template-icon-1', '#FF5733', 'Bug tracking list', 'Status, Priority, Assignee', 1, 1),
        ('Employee onboarding', 'https://example.com/employee-onboarding.jpg', 'Help new employees onboard smoothly.', 'template-icon-2', '#33B5FF', 'Checklist for new hires', 'Steps, Owner, Deadline', 1, 1),
        ('Event itinerary', 'https://example.com/event-itinerary.jpg', 'Organize your event day by day.', 'template-icon-3', '#9C27B0', 'Event planning guide', 'Schedule, Location, Notes', 1, 1),
        ('Asset manager', 'https://example.com/asset-manager.jpg', 'Manage company assets in one place.', 'template-icon-4', '#4CAF50', 'Track assets', 'Asset name, Value, Assigned to', 1, 1),
        ('Recruitment tracker', 'https://example.com/recruitment-tracker.jpg', 'Track hiring pipeline.', 'template-icon-5', '#FFC107', 'Track job candidates', 'Stage, Resume, Interview', 1, 1);
    `);

    await dataSource.query(`
      INSERT INTO 
        ViewType (TypeName, DisplayName, HeaderImage, Icon) 
      VALUES 
        ('Grid', 'Grid View', 'http://example.com/images/grid.png', 'grid-icon'),
        ('Calendar', 'Calendar View', 'http://example.com/images/calendar.png', 'calendar-icon'),
        ('Gallery', 'Gallery View', 'http://example.com/images/gallery.png', 'gallery-icon'),
        ('Board', 'Kanban Board', 'http://example.com/images/board.png', 'board-icon');
    `);

    await dataSource.query(`
      INSERT INTO 
        ViewSetting (SettingKey, DisplayName, ValueType) 
      VALUES 
        ('IsPublic', 'Visibility', 'Boolean'),
        ('StartDate', 'Start Date', 'Integer'),
        ('EndDate', 'End Date', 'Integer'),
        ('Title', 'Title', 'Integer'),
        ('Subheading', 'Subheading', 'Integer'),
        ('OrganizeBoardBy', 'Organize board by', 'Integer'),
        ('DefaultLayout', 'Default layout', 'String');
    `);

    await dataSource.query(`
      INSERT INTO 
        ViewTypeSetting (ViewTypeId, ViewSettingId) 
      VALUES 
        (1, 1),                          -- Grid → IsPublic
        (2, 1), (2, 2), (2, 3),          -- Calendar → IsPublic, StartDate, EndDate
        (2, 4), (2, 5), (2, 7),          -- Calendar → Title, Subheading, DefaultLayout
        (3, 1),                          -- Gallery → IsPublic
        (4, 1), (4, 6);                  -- Board → IsPublic, OrganizeBoardBy
    `);

    await dataSource.query(`
      INSERT INTO 
        TemplateView (ViewName, ListTemplateId, ViewTypeId, DisplayOrder)
      VALUES 
        -- Template 1
        ('Grid View', 1, 1, 1),
        ('Calendar View', 1, 2, 2),
        ('Gallery View', 1, 3, 3),
        ('Board View', 1, 4, 4),

        -- Template 2
        ('Grid View', 2, 1, 1),
        ('Board View', 2, 4, 2),

        -- Template 3
        ('Calendar View', 3, 2, 1),
        ('Gallery View', 3, 3, 2),
        ('Board View', 3, 4, 3),

        -- Template 4
        ('Grid View', 4, 1, 1),
        ('Calendar View', 4, 2, 2),

        -- Template 5
        ('Gallery View', 5, 3, 1),
        ('Board View', 5, 4, 2);
    `);

    await dataSource.query(`
      INSERT INTO 
        SystemDataType (DisplayName, DataTypeValue, Icon, TypeDescription, CoverImage) 
      VALUES 
        ('Text', 'Text', 'systemdatatype-icon-1', 'Single line of text', 'cover-text.png'),
        ('Choice', 'Choice', 'systemdatatype-icon-2', 'Offer a set of choices', 'cover-choice.png'),
        ('Date and time', 'DateTime', 'systemdatatype-icon-3', 'Set a date or date and time', 'cover-datetime.png'),
        ('Multiple lines of text', 'MultilineText', 'systemdatatype-icon-4', 'Use multiple lines of text or rich formatting', 'cover-multiline.png'),
        ('Person', 'Person', 'systemdatatype-icon-5', 'Use names of people or groups from your organization', 'cover-person.png'),
        ('Number', 'Number', 'systemdatatype-icon-6', 'Set numeric values', 'cover-number.png'),
        ('Yes/No', 'Boolean', 'systemdatatype-icon-7', 'Set a choice between two values, like yes/no', 'cover-yesno.png'),
        ('Hyperlink', 'Hyperlink', 'systemdatatype-icon-8', 'Set a link to a web page, image, or other resources', 'cover-hyperlink.png'),
        ('Currency', 'Currency', 'systemdatatype-icon-9', 'Set monetary amounts in world currencies', 'cover-currency.png'),
        ('Location', 'Location', 'systemdatatype-icon-10', 'Use map locations or even a room in your building', 'cover-location.png'),
        ('Image', 'Image', 'systemdatatype-icon-11', 'Set an image for an item', 'cover-image.png'),
        ('Lookup', 'Lookup', 'systemdatatype-icon-12', 'Make a column from one list become the choices in another list column', 'cover-lookup.png'),
        ('Average Rating', 'Rating', 'systemdatatype-icon-13', 'Let multiple people rate an item and see the average rating', 'cover-rating.png');
    `);

    await dataSource.query(`
      INSERT INTO 
        KeySetting (KeyName, ValueType, DisplayName) 
      VALUES 
        -- Common settings
        ('required', 'boolean', 'Required'),
        ('defaultValue', 'string', 'Default Value'),
        ('minLength', 'number', 'Minimum Length'),
        ('maxLength', 'number', 'Maximum Length'),
        ('placeholder', 'string', 'Placeholder Text'),
        -- Number-specific
        ('minValue', 'number', 'Minimum Value'),
        ('maxValue', 'number', 'Maximum Value'),
        -- Choice-specific
        ('choices', 'json', 'Choice Options'),
        ('allowMultiple', 'boolean', 'Allow Multiple Selections'),
        -- Date-specific
        ('dateFormat', 'string', 'Date Format'),
        -- Lookup-specific
        ('lookupListId', 'number', 'Lookup List Id'),
        ('lookupFieldName', 'string', 'Lookup Field Name');
    `);

    await dataSource.query(`
      INSERT INTO 
        DataTypeSettingKey (SystemDataTypeId, KeySettingId) 
      VALUES 
        -- Text
        (1, 1),  -- required  
        (1, 2),  -- defaultValue  
        (1, 3),  -- minLength  
        (1, 4),  -- maxLength  
        (1, 5),  -- placeholder  
        -- Number
        (3, 1),  -- required  
        (3, 2),  -- defaultValue  
        (3, 6),  -- minValue  
        (3, 7),  -- maxValue  
        -- Choice
        (4, 1),  -- required  
        (4, 8),  -- choices  
        (4, 9),  -- allowMultiple  
        -- Date
        (5, 1),  -- required  
        (5, 2),  -- defaultValue  
        (5, 10), -- dateFormat  
        -- Lookup
        (7, 1),  -- required  
        (7, 11), -- lookupListId  
        (7, 12); -- lookupFieldName  
    `);

    await dataSource.query(`
      INSERT INTO 
        TemplateColumn (ColumnName, ColumnDescription, DisplayOrder, IsVisible, SystemDataTypeId, ListTemplateId) 
      VALUES 
        ('Title', 'Task title or name', 1, 1, 1, 1),                       -- Text
        ('Description', 'Detailed description of the task', 2, 1, 1, 1),   -- Text
        ('Assignee', 'Person assigned to this task', 3, 1, 8, 1),          -- Person
        ('Status', 'Current status of the task', 4, 1, 4, 1),              -- Choice
        ('Priority', 'Task priority level', 5, 1, 4, 1);                   -- Choice
    `);

    await dataSource.query(`
      INSERT INTO 
        TemplateViewSetting (TemplateViewId, ViewTypeSettingId, GroupByColumnId, RawValue) 
      VALUES 
        -- GRID VIEW (TemplateViewId = 1, ViewTypeId = 1)
        (1, 1, NULL, 'true'),
        -- CALENDAR VIEW (TemplateViewId = 2, ViewTypeId = 2)
        (2, 2, NULL, 'true'),         -- IsPublic
        (2, 3, 1, NULL),              -- StartDate → ColumnId = 1
        (2, 4, 2, NULL),              -- EndDate → ColumnId = 2
        (2, 5, 3, NULL),              -- Title → ColumnId = 3
        (2, 6, 4, NULL),              -- Subheading → ColumnId = 4
        (2, 7, NULL, 'month');        -- DefaultLayout
    `);

    await dataSource.query(`
      INSERT INTO 
        TemplateSampleRow (ListTemplateId, DisplayOrder) 
      VALUES 
        (1, 1),
        (1, 2),
        (1, 3),
        (1, 4),
        (1, 5);
    `);

    await dataSource.query(`
      INSERT INTO TemplateColumnObject (TemplateColumnId, DisplayName, DisplayColor, DisplayOrder) VALUES 
        (1, 'High', '#FF5722', 1),
        (1, 'Medium', '#FF9800', 2),
        (1, 'Low', '#4CAF50', 3),
        (2, 'Planning', '#9C27B0', 1),
        (2, 'In Progress', '#2196F3', 2),
        (2, 'Completed', '#4CAF50', 3);
    `);

    await dataSource.query(`
      INSERT INTO 
        TemplateSampleCellValue (TemplateColumnId, TemplateSampleRowId, CellValue) 
      VALUES 
        (1, 1, 'Task A'),
        (2, 1, 'Low'),
        (3, 1, 'Open'),
        (4, 1, 'Alice'),
        (5, 1, '2025-08-01'),

        (1, 2, 'Task B'),
        (2, 2, 'Medium'),
        (3, 2, NULL),
        (4, 2, 'Bob'),
        (5, 2, '2025-08-03'),

        (1, 3, 'Task C'),
        (2, 3, NULL),
        (3, 3, 'Closed'),
        (4, 3, 'Carol'),
        (5, 3, '2025-08-05'),

        (1, 4, NULL),
        (2, 4, 'High'),
        (3, 4, 'Open'),
        (4, 4, 'Dan'),
        (5, 4, NULL),

        (1, 5, 'Task E'),
        (2, 5, 'Low'),
        (3, 5, 'Closed'),
        (4, 5, 'Eve'),
        (5, 5, '2025-08-07');
    `);

    await dataSource.query(`
      INSERT INTO 
        List (ListName, Icon, Color, ListTypeId, WorkspaceId, CreatedBy) 
      VALUES 
        ('Project Alpha', 'folder', '#FF5733', 2, 1, 1),
        ('Daily Tasks', 'check', '#33FF57', 4, 1, 2),
        ('Backlog', 'box', '#3357FF', 5, 1, 3),
        ('Marketing Plan', 'chart', '#F1C40F', 1, 1, 4),
        ('Sprint Board', 'run', '#8E44AD', 2, 1, 5);
    `);

    await dataSource.query(`
      INSERT INTO 
        FavoriteList (ListId, FavoredBy) 
      VALUES 
        (1, 1),
        (2, 2),
        (3, 1),
        (4, 3),
        (5, 2);
    `);

    await dataSource.query(`
      INSERT INTO 
        AccountList (AccountId, ListId) 
      VALUES 
        (1, 1), (1, 2), (1, 3),
        (2, 2), (2, 3),
        (3, 1), (3, 3), (3, 4),
        (4, 1), (4, 2),
        (5, 4);
    `);

    await dataSource.query(`
      INSERT INTO 
        ListView (ViewName, DisplayOrder, ListId, ViewTypeId, CreatedBy) 
      VALUES 
        ('Grid View', 1, 1, 1, 1),
        ('Calendar View', 2, 1, 2, 1),
        ('Gallery View', 3, 1, 3, 1),
        ('Board View', 4, 1, 4, 1);
    `);

    await dataSource.query(`
      INSERT INTO 
        SystemColumn (ColumnName, ColumnDescription, DisplayOrder, SystemDataTypeId) 
      VALUES 
        ('Title', 'Main title field', 1, 1),
        ('Compliance Asset Id', 'Compliance tracking ID', 2, 1),
        ('ID', 'System-generated unique ID', 3, 3);
    `);

    await dataSource.query(`
      INSERT INTO 
        SystemColumnSettingValue (SystemColumnId, DataTypeSettingKeyId, KeyValue)
      VALUES 
        -- Text Column (ColumnId = 1)
        (1, 1, 'true'),     -- Required
        (1, 2, 'left'),     -- Alignment
        (1, 3, '20');       -- MaxLength
    `);

    await dataSource.query(`
      INSERT INTO ListDynamicColumn (
        ColumnName,
        ColumnDescription,
        DisplayOrder,
        IsVisible,
        IsRequired,
        CreatedBy,
        ListId,
        SystemDataTypeId
      )
      VALUES
        ('Title', 'Task title', 1, 1, 1, 2, 1, 1),
        ('Due Date', 'Deadline for task', 2, 1, 0, 1, 1, 3),
        ('Priority', 'Priority level', 3, 1, 1, 3, 1, 2),
        ('Assigned To', 'Person responsible', 4, 1, 0, 4, 1, 5),
        ('Status', 'Task status', 5, 1, 0, 2, 1, 2);
    `);

    await dataSource.query(`
      INSERT INTO 
        ListColumnSettingValue (ColumnId, DataTypeSettingKeyId, KeyValue)
      VALUES
        -- Title Column (ColumnId = 1, SystemDataTypeId = 1 - Text)
        (1, 1, 'true'),           -- required
        (1, 2, 'Untitled'),       -- defaultValue
        (1, 4, '255'),            -- maxLength
        (1, 5, 'Enter title...'); -- placeholder
    `);

    await dataSource.query(`
      INSERT INTO 
        ListViewSetting (ListViewId, ViewTypeSettingId, GroupByColumnId, RawValue)
      VALUES
        -- List 1 Views (ListViewId 1-4)
        (1, 1, NULL, 'true'),             -- Grid View → IsPublic
        (2, 2, NULL, 'true'),             -- Calendar View → IsPublic
        (2, 3, 2, NULL),                  -- Calendar View → StartDate (Due Date column)
        (2, 4, 2, NULL),                  -- Calendar View → EndDate (Due Date column)
        (2, 5, 1, NULL),                  -- Calendar View → Title (Title column)
        (2, 6, 5, NULL);                  -- Calendar View → Subheading (Status column)
    `);

    await dataSource.query(`
      INSERT INTO 
        ListColumnObject (ListDynamicColumnId, DisplayName, DisplayColor, DisplayOrder)
      VALUES
        -- Priority Column (ColumnId = 3) - Choice options
        (3, 'Low', '#4CAF50', 1),           -- Green for Low priority
        (3, 'Medium', '#FF9800', 2),        -- Orange for Medium priority
        (3, 'High', '#FF5722', 3),          -- Red-Orange for High priority
        (3, 'Critical', '#D32F2F', 4);      -- Dark Red for Critical priority
    `);

    await dataSource.query(`
      INSERT INTO 
        ListRow (ListId, DisplayOrder, CreatedBy)
      VALUES
        (1, 1, 1),   -- Row 1 created by Alice
        (1, 2, 1),   -- Row 2 created by Alice
        (1, 3, 1),   -- Row 3 created by Alice
        (1, 4, 1),   -- Row 4 created by Alice
        (1, 5, 1);   -- Row 5 created by Alice
    `);

    await dataSource.query(`
      INSERT INTO 
        ListCellValue (ListRowId, ListDynamicColumnId, CellValue)
      VALUES
        -- Row 1 data
        (1, 1, 'Setup database schema'),
        (1, 2, '2025-08-15'),
        (1, 3, 'High'),
        (1, 4, 'Alice Johnson'),
        (1, 5, 'In Progress'),

        -- Row 2 data
        (2, 1, 'Implement user authentication'),
        (2, 2, '2025-08-20'),
        (2, 3, 'Critical'),
        (2, 4, 'Bob Smith'),
        (2, 5, 'Open'),

        -- Row 3 data
        (3, 1, 'Design user interface'),
        (3, 2, NULL),
        (3, 3, 'Medium'),
        (3, 4, NULL),
        (3, 5, 'Review'),

        -- Row 4 data
        (4, 1, 'Setup CI/CD pipeline'),
        (4, 2, '2025-08-25'),
        (4, 3, 'High'),
        (4, 4, 'Carol Davis'),
        (4, 5, 'Closed'),

        -- Row 5 data
        (5, 1, NULL),
        (5, 2, '2025-08-30'),
        (5, 3, 'Low'),
        (5, 4, 'David Wilson'),
        (5, 5, 'Open');
    `);

    await dataSource.query(`
      INSERT INTO 
        ListRowComment (ListRowId, Content, CreatedBy)
      VALUES
        (1, 'Great progress on the database schema! The structure looks solid.', 2),
        (1, 'Should we consider adding indexes for performance optimization?', 3),
        (1, 'I noticed some foreign key constraints might need review.', 4),
        (1, 'The documentation for this task is excellent.', 5),
        (1, 'Ready for code review once testing is complete.', 1);
    `);

    await dataSource.query(`
      INSERT INTO 
        Permission (PermissionCode, PermissionName, PermissionIcon, PermissionDescription)
      VALUES 
        ('OWNER', 'Can edit list', 'Owner Icon', 'Can edit, add, or remove items, columns or views'),
        ('CONTRIBUTOR', 'Can edit items', 'Contributor Icon', 'Can edit,  add, or remove items'),
        ('READER', 'Can view', 'Reader Icon', 'Can''t edit or share items or this list');
    `);

    await dataSource.query(`
      INSERT INTO 
        ListMemberPermission (ListId, AccountId, HighestPermissionId)
      VALUES
        -- List 1
        (1, 1, 1),  -- Alice (Creator) -> OWNER
        (1, 2, 2),  -- Bob -> CONTRIBUTOR
        (1, 3, 2),  -- Charlie -> CONTRIBUTOR
        (1, 4, 3),  -- Daisy -> READER
        (1, 5, 2);  -- George -> CONTRIBUTOR
    `);

    await dataSource.query(`
      INSERT INTO 
        Scope (ScopeCode, ScopeName, ScopeIcon, ScopeDescription)
      VALUES 
        ('PUBLIC', 'Anyone', 'Public Icon', 'Public Description'),
        ('AUTHORIZED', 'Only people with existing access', 'Authorized Icon', 'Authorized Description'),
        ('SPECIFIC', 'People you choose', 'Specific Icon', 'Specific Description');
    `);

    await dataSource.query(`
      INSERT INTO 
        ShareLink (TargetUrl, ShareLinkMessage, ListId, ScopeId, PermissionId, CreatedBy)
      VALUES
      -- Public sharing links (ScopeId = 1 - PUBLIC)
        ('https://lists.company.com/share/proj-alpha-abc123', 'Check out our project progress and milestones', 1, 1, 3, 1),
        ('https://lists.company.com/share/daily-tasks-pqr678', 'Personal task management with team visibility', 1, 2, 2, 1),
        ('https://lists.company.com/share/weekly-report-efg123', 'Weekly progress reports - management access', 1, 3, 1, 1),
        ('https://lists.company.com/share/social-media-tuv678', 'Social media content calendar - marketing team', 1, 2, 2, 1);
    `);

    await dataSource.query(`
      INSERT INTO 
        ShareLinkOption (OptionName, ValueType, OptionValue, ScopeId)
      VALUES 
        ('Is Login Required', 'BIT', '0', 1),
        ('Set Expiration Date', 'DATETIME', NULL, 1),
        ('Set Expiration Date', 'DATETIME', NULL, 3),
        ('Set Password', 'NVARCHAR', NULL, 1);
    `);

    await dataSource.query(`
      INSERT INTO 
        ShareLinkOptionValue (ShareLinkId, ShareLinkOptionId, OptionValue)
      VALUES
        (1, 1, '0'),                    -- Project Alpha - No login required
        (1, 2, '2025-12-31 23:59:59'),  -- Project Alpha expires end of year
        (1, 4, 'default123');           -- Project Alpha - default password
    `);

    await dataSource.query(`
    INSERT INTO 
      ShareLinkUserAccess (ShareLinkId, AccountId)
    VALUES
      (1, 1),
      (1, 2),
      (1, 3),
      (1, 4),
      (1, 5);
    `);

    await dataSource.query(`
      INSERT INTO 
        FileAttachment (NameFile, FileUrl, Size, FileStatus, ListRowId, CreateBy)
      VALUES
        -- Attachments for various list rows
        ('database_schema_v1.sql', 'https://files.company.com/attachments/db-schema-v1.sql', '45.2 KB', 'Active', 1, 1),
        ('requirements_document.pdf', 'https://files.company.com/attachments/requirements-doc.pdf', '2.3 MB', 'Active', 1, 1),
        ('authentication_spec.docx', 'https://files.company.com/attachments/auth-spec.docx', '1.8 MB', 'Active', 2, 1),
        ('security_checklist.xlsx', 'https://files.company.com/attachments/security-checklist.xlsx', '156 KB', 'Active', 2, 1),
        ('ui_mockups.fig', 'https://files.company.com/attachments/ui-mockups.fig', '12.7 MB', 'Active', 3, 1);
    `);

    await dataSource.query(`
    INSERT INTO 
      ObjectType (ObjectCode, ObjectName, ObjectIcon) 
    VALUES
      ('FILE', 'File', 'file-icon'),
      ('LIST', 'List', 'list-icon'),
      ('LISTROW', 'List Row', 'list-row-icon');
    `);

    await dataSource.query(`
      INSERT INTO 
        TrashItem (ObjectId, ObjectTypeId, PathItem, CreateBy, DeletedBy)
      VALUES
        (1, 1, 'path/to/file1', 1, 2),
        (2, 2, 'path/to/list1', 1, 2),
        (3, 3, 'path/to/listrow1', 1, 2)
    `);

    console.log('>>> All data inserted successfully!');
  } catch (error) {
    console.error('>>> Error inserting data: ', error);
    throw error;
  }
}
