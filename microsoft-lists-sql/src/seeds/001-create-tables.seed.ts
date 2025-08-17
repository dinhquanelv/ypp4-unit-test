import { DataSource } from 'typeorm';

export async function createTables(dataSource: DataSource): Promise<void> {
  console.log('>>> Creating all tables...');

  try {
    await dataSource.query('DROP TABLE IF EXISTS TrashItem');
    await dataSource.query('DROP TABLE IF EXISTS ObjectType');
    await dataSource.query('DROP TABLE IF EXISTS FileAttachment');
    await dataSource.query('DROP TABLE IF EXISTS ShareLinkUserAccess');
    await dataSource.query('DROP TABLE IF EXISTS ShareLinkOptionValue');
    await dataSource.query('DROP TABLE IF EXISTS ShareLinkOption');
    await dataSource.query('DROP TABLE IF EXISTS ShareLink');
    await dataSource.query('DROP TABLE IF EXISTS Scope');
    await dataSource.query('DROP TABLE IF EXISTS ListMemberPermission');
    await dataSource.query('DROP TABLE IF EXISTS Permission');
    await dataSource.query('DROP TABLE IF EXISTS ListRowComment');
    await dataSource.query('DROP TABLE IF EXISTS ListCellValue');
    await dataSource.query('DROP TABLE IF EXISTS ListRow');
    await dataSource.query('DROP TABLE IF EXISTS ListColumnObject');
    await dataSource.query('DROP TABLE IF EXISTS ListViewSetting');
    await dataSource.query('DROP TABLE IF EXISTS ListColumnSettingValue');
    await dataSource.query('DROP TABLE IF EXISTS ListDynamicColumn');
    await dataSource.query('DROP TABLE IF EXISTS SystemColumnSettingValue');
    await dataSource.query('DROP TABLE IF EXISTS SystemColumn');
    await dataSource.query('DROP TABLE IF EXISTS ListView');
    await dataSource.query('DROP TABLE IF EXISTS AccountList');
    await dataSource.query('DROP TABLE IF EXISTS FavoriteList');
    await dataSource.query('DROP TABLE IF EXISTS List');
    await dataSource.query('DROP TABLE IF EXISTS TemplateColumnObject');
    await dataSource.query('DROP TABLE IF EXISTS TemplateSampleCellValue');
    await dataSource.query('DROP TABLE IF EXISTS TemplateSampleRow');
    await dataSource.query('DROP TABLE IF EXISTS TemplateViewSetting');
    await dataSource.query('DROP TABLE IF EXISTS TemplateColumn');
    await dataSource.query('DROP TABLE IF EXISTS DataTypeSettingKey');
    await dataSource.query('DROP TABLE IF EXISTS KeySetting');
    await dataSource.query('DROP TABLE IF EXISTS SystemDataType');
    await dataSource.query('DROP TABLE IF EXISTS TemplateView');
    await dataSource.query('DROP TABLE IF EXISTS ViewTypeSetting');
    await dataSource.query('DROP TABLE IF EXISTS ViewSetting');
    await dataSource.query('DROP TABLE IF EXISTS ViewType');
    await dataSource.query('DROP TABLE IF EXISTS ListTemplate');
    await dataSource.query('DROP TABLE IF EXISTS TemplateProvider');
    await dataSource.query('DROP TABLE IF EXISTS ListType');
    await dataSource.query('DROP TABLE IF EXISTS AccountWorkspace');
    await dataSource.query('DROP TABLE IF EXISTS Workspace');
    await dataSource.query('DROP TABLE IF EXISTS Account');
    console.log('>>> All existing tables dropped');

    await dataSource.query(`
      CREATE TABLE Account (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        FirstName TEXT NOT NULL,
        LastName TEXT NOT NULL,
        Email TEXT NOT NULL UNIQUE,
        AccountPassword TEXT NOT NULL,
        Avatar TEXT,
        Company TEXT,
        AccountRole TEXT,
        AccountStatus TEXT NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await dataSource.query(`
      CREATE TABLE Workspace (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        WorkspaceName TEXT NOT NULL,
        Icon TEXT,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await dataSource.query(`
      CREATE TABLE AccountWorkspace (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        AccountId INTEGER NOT NULL,
        WorkspaceId INTEGER NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (AccountId) REFERENCES Account(Id),
        FOREIGN KEY (WorkspaceId) REFERENCES Workspace(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE ListType (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Title TEXT NOT NULL,
        Icon TEXT,
        HeaderImage TEXT,
        ListTypeDescription TEXT,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await dataSource.query(`
      CREATE TABLE TemplateProvider (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ProviderName TEXT NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await dataSource.query(`
      CREATE TABLE ListTemplate (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        Title TEXT NOT NULL,
        HeaderImage TEXT NOT NULL,
        TemplateDescription TEXT,
        Icon TEXT,
        Color TEXT,
        Summary TEXT,
        Feature TEXT,
        ListTypeId INTEGER NOT NULL,
        TemplateProviderId INTEGER NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ListTypeId) REFERENCES ListType(Id),
        FOREIGN KEY (TemplateProviderId) REFERENCES TemplateProvider(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE ViewType (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        TypeName TEXT NOT NULL,
        DisplayName TEXT NOT NULL,
        HeaderImage TEXT NOT NULL,
        Icon TEXT NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await dataSource.query(`
      CREATE TABLE ViewSetting (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        SettingKey TEXT NOT NULL,
        DisplayName TEXT NOT NULL,
        ValueType TEXT NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await dataSource.query(`
      CREATE TABLE ViewTypeSetting (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ViewTypeId INTEGER NOT NULL,
        ViewSettingId INTEGER NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ViewTypeId) REFERENCES ViewType(Id),
        FOREIGN KEY (ViewSettingId) REFERENCES ViewSetting(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE TemplateView (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ViewName TEXT NOT NULL,
        ListTemplateId INTEGER NOT NULL,
        ViewTypeId INTEGER NOT NULL,
        DisplayOrder INTEGER NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ListTemplateId) REFERENCES ListTemplate(Id),
        FOREIGN KEY (ViewTypeId) REFERENCES ViewType(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE SystemDataType (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        DisplayName TEXT NOT NULL,
        DataTypeValue TEXT NOT NULL,
        Icon TEXT NOT NULL,
        TypeDescription TEXT NOT NULL,
        CoverImage TEXT NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await dataSource.query(`
      CREATE TABLE KeySetting (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        KeyName TEXT NOT NULL,
        ValueType TEXT NOT NULL,
        DisplayName TEXT NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await dataSource.query(`
      CREATE TABLE DataTypeSettingKey (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        SystemDataTypeId INTEGER NOT NULL,
        KeySettingId INTEGER NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (SystemDataTypeId) REFERENCES SystemDataType(Id),
        FOREIGN KEY (KeySettingId) REFERENCES KeySetting(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE TemplateColumn (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ColumnName TEXT NOT NULL,
        ColumnDescription TEXT,
        DisplayOrder INTEGER NOT NULL DEFAULT 0,
        IsVisible INTEGER NOT NULL DEFAULT 1,
        SystemDataTypeId INTEGER NOT NULL,
        ListTemplateId INTEGER NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (SystemDataTypeId) REFERENCES SystemDataType(Id),
        FOREIGN KEY (ListTemplateId) REFERENCES ListTemplate(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE TemplateViewSetting (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        TemplateViewId INTEGER NOT NULL,
        ViewTypeSettingId INTEGER NOT NULL,
        GroupByColumnId INTEGER,
        RawValue TEXT,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (TemplateViewId) REFERENCES TemplateView(Id),
        FOREIGN KEY (ViewTypeSettingId) REFERENCES ViewTypeSetting(Id),
        FOREIGN KEY (GroupByColumnId) REFERENCES TemplateColumn(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE TemplateSampleRow (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ListTemplateId INTEGER NOT NULL,
        DisplayOrder INTEGER NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ListTemplateId) REFERENCES ListTemplate(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE TemplateSampleCellValue (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        TemplateColumnId INTEGER NOT NULL,
        TemplateSampleRowId INTEGER NOT NULL,
        CellValue TEXT,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (TemplateColumnId) REFERENCES TemplateColumn(Id),
        FOREIGN KEY (TemplateSampleRowId) REFERENCES TemplateSampleRow(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE TemplateColumnObject (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        TemplateColumnId INTEGER NOT NULL,
        DisplayName TEXT NOT NULL,
        DisplayColor TEXT,
        DisplayOrder INTEGER NOT NULL DEFAULT 1,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (TemplateColumnId) REFERENCES TemplateColumn(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE List (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ListName TEXT NOT NULL,
        Icon TEXT NOT NULL,
        Color TEXT NOT NULL,
        ListTypeId INTEGER NOT NULL,
        WorkspaceId INTEGER NOT NULL,
        TemplateId INTEGER,
        CreatedBy INTEGER NOT NULL,
        AccessedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ListTypeId) REFERENCES ListType(Id),
        FOREIGN KEY (WorkspaceId) REFERENCES Workspace(Id),
        FOREIGN KEY (TemplateId) REFERENCES ListTemplate(Id),
        FOREIGN KEY (CreatedBy) REFERENCES Account(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE FavoriteList (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ListId INTEGER NOT NULL,
        FavoredBy INTEGER NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ListId) REFERENCES List(Id),
        FOREIGN KEY (FavoredBy) REFERENCES Account(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE AccountList (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        AccountId INTEGER NOT NULL,
        ListId INTEGER NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (AccountId) REFERENCES Account(Id),
        FOREIGN KEY (ListId) REFERENCES List(Id)
      )
    `);

    // Create new tables
    await dataSource.query(`
      CREATE TABLE ListView (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ViewName TEXT NOT NULL,
        DisplayOrder INTEGER NOT NULL,
        ListId INTEGER NOT NULL,
        ViewTypeId INTEGER NOT NULL,
        CreatedBy INTEGER NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ListId) REFERENCES List(Id),
        FOREIGN KEY (ViewTypeId) REFERENCES ViewType(Id),
        FOREIGN KEY (CreatedBy) REFERENCES Account(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE SystemColumn (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ColumnName TEXT NOT NULL,
        ColumnDescription TEXT NOT NULL,
        DisplayOrder INTEGER NOT NULL,
        SystemDataTypeId INTEGER NOT NULL,
        IsVisible INTEGER NOT NULL DEFAULT 0,
        IsRequired INTEGER NOT NULL DEFAULT 0,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (SystemDataTypeId) REFERENCES SystemDataType(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE SystemColumnSettingValue (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        SystemColumnId INTEGER NOT NULL,
        DataTypeSettingKeyId INTEGER NOT NULL,
        KeyValue TEXT NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (SystemColumnId) REFERENCES SystemColumn(Id),
        FOREIGN KEY (DataTypeSettingKeyId) REFERENCES DataTypeSettingKey(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE ListDynamicColumn (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ColumnName TEXT NOT NULL,
        ColumnDescription TEXT NOT NULL,
        DisplayOrder INTEGER NOT NULL,
        IsVisible INTEGER NOT NULL DEFAULT 0,
        IsRequired INTEGER NOT NULL DEFAULT 0,
        CreatedBy INTEGER NOT NULL,
        ListId INTEGER NOT NULL,
        SystemDataTypeId INTEGER NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (CreatedBy) REFERENCES Account(Id),
        FOREIGN KEY (ListId) REFERENCES List(Id),
        FOREIGN KEY (SystemDataTypeId) REFERENCES SystemDataType(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE ListColumnSettingValue (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ColumnId INTEGER NOT NULL,
        DataTypeSettingKeyId INTEGER NOT NULL,
        KeyValue TEXT NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ColumnId) REFERENCES ListDynamicColumn(Id),
        FOREIGN KEY (DataTypeSettingKeyId) REFERENCES DataTypeSettingKey(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE ListViewSetting (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ListViewId INTEGER NOT NULL,
        ViewTypeSettingId INTEGER NOT NULL,
        GroupByColumnId INTEGER,
        RawValue TEXT,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ListViewId) REFERENCES ListView(Id),
        FOREIGN KEY (ViewTypeSettingId) REFERENCES ViewTypeSetting(Id),
        FOREIGN KEY (GroupByColumnId) REFERENCES ListDynamicColumn(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE ListColumnObject (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ListDynamicColumnId INTEGER NOT NULL,
        DisplayName TEXT NOT NULL,
        DisplayColor TEXT NOT NULL,
        DisplayOrder INTEGER NOT NULL DEFAULT 1,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ListDynamicColumnId) REFERENCES ListDynamicColumn(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE ListRow (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ListId INTEGER NOT NULL,
        DisplayOrder INTEGER NOT NULL,
        CreatedBy INTEGER NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ListId) REFERENCES List(Id),
        FOREIGN KEY (CreatedBy) REFERENCES Account(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE ListCellValue (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ListRowId INTEGER NOT NULL,
        ListDynamicColumnId INTEGER NOT NULL,
        CellValue TEXT,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ListRowId) REFERENCES ListRow(Id),
        FOREIGN KEY (ListDynamicColumnId) REFERENCES ListDynamicColumn(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE ListRowComment (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ListRowId INTEGER NOT NULL,
        Content TEXT NOT NULL,
        CreatedBy INTEGER NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ListRowId) REFERENCES ListRow(Id),
        FOREIGN KEY (CreatedBy) REFERENCES Account(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE Permission (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        PermissionCode TEXT NOT NULL,
        PermissionName TEXT NOT NULL,
        PermissionIcon TEXT,
        PermissionDescription TEXT,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await dataSource.query(`
      CREATE TABLE ListMemberPermission (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ListId INTEGER NOT NULL,
        AccountId INTEGER NOT NULL,
        HighestPermissionId INTEGER NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ListId) REFERENCES List(Id),
        FOREIGN KEY (AccountId) REFERENCES Account(Id),
        FOREIGN KEY (HighestPermissionId) REFERENCES Permission(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE Scope (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ScopeCode TEXT NOT NULL UNIQUE,
        ScopeName TEXT NOT NULL,
        ScopeIcon TEXT,
        ScopeDescription TEXT,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await dataSource.query(`
      CREATE TABLE ShareLink (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        TargetUrl TEXT NOT NULL,
        ShareLinkMessage TEXT,
        ListId INTEGER NOT NULL,
        ScopeId INTEGER NOT NULL,
        PermissionId INTEGER NOT NULL,
        CreatedBy INTEGER NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ListId) REFERENCES List(Id),
        FOREIGN KEY (ScopeId) REFERENCES Scope(Id),
        FOREIGN KEY (PermissionId) REFERENCES Permission(Id),
        FOREIGN KEY (CreatedBy) REFERENCES Account(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE ShareLinkOption (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        OptionName TEXT NOT NULL,
        ValueType TEXT NOT NULL,
        OptionValue TEXT,
        ScopeId INTEGER NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ScopeId) REFERENCES Scope(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE ShareLinkOptionValue (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ShareLinkId INTEGER NOT NULL,
        ShareLinkOptionId INTEGER NOT NULL,
        OptionValue TEXT NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ShareLinkId) REFERENCES ShareLink(Id),
        FOREIGN KEY (ShareLinkOptionId) REFERENCES ShareLinkOption(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE ShareLinkUserAccess (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ShareLinkId INTEGER NOT NULL,
        AccountId INTEGER NOT NULL,
        CreatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ShareLinkId) REFERENCES ShareLink(Id),
        FOREIGN KEY (AccountId) REFERENCES Account(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE FileAttachment (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        NameFile TEXT NOT NULL,
        FileUrl TEXT NOT NULL,
        Size TEXT NOT NULL,
        FileStatus TEXT NOT NULL,
        ListRowId INTEGER NOT NULL,
        CreateBy INTEGER NOT NULL,
        DeleteAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ListRowId) REFERENCES ListRow(Id),
        FOREIGN KEY (CreateBy) REFERENCES Account(Id)
      )
    `);

    await dataSource.query(`
      CREATE TABLE ObjectType (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ObjectCode TEXT,
        ObjectName TEXT,
        ObjectIcon TEXT,
        DeleteAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await dataSource.query(`
      CREATE TABLE TrashItem (
        Id INTEGER PRIMARY KEY AUTOINCREMENT,
        ObjectId INTEGER NOT NULL,
        ObjectTypeId INTEGER NOT NULL,
        PathItem TEXT,
        CreateBy INTEGER NOT NULL,
        DeletedBy INTEGER NOT NULL,
        DeleteAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        UpdatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ObjectTypeId) REFERENCES ObjectType(Id),
        FOREIGN KEY (CreateBy) REFERENCES Account(Id),
        FOREIGN KEY (DeletedBy) REFERENCES Account(Id)
      )
    `);

    console.log('>>> All tables created successfully!');
  } catch (error) {
    console.error('>>> Error creating tables: ', error);
    throw error;
  }
}
