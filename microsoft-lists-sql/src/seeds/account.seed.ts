import { DataSource } from 'typeorm';

export async function seedAccounts(dataSource: DataSource): Promise<void> {
  try {
    await dataSource.query('DELETE FROM Account');
    await dataSource.query('DELETE FROM sqlite_sequence WHERE name="Account"');
    await dataSource.query(`
      INSERT INTO Account (FirstName, LastName, Email, AccountPassword, Avatar, Company, AccountRole, AccountStatus, CreatedAt, UpdatedAt) 
      VALUES 
        ('John', 'Doe', 'john.doe@example.com', 'password123', 'https://example.com/avatars/john.jpg', 'Tech Corp', 'Admin', 'Active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('Jane', 'Smith', 'jane.smith@example.com', 'password456', 'https://example.com/avatars/jane.jpg', 'Design Studio', 'User', 'Active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
        ('Mike', 'Johnson', 'mike.johnson@example.com', 'password789', NULL, 'Marketing Inc', 'Manager', 'Active', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);

    console.log('Created seed successfully');
  } catch (error) {
    console.error('Created seed failed: ', error);
    throw error;
  }
}
