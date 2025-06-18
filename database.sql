CREATE TABLE requisitions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  requester_name VARCHAR(100),
  item_name VARCHAR(255),
  quantity INT,
  department VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Pending',
  submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE vendors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vendor_name VARCHAR(255),
  contact_email VARCHAR(100)
);

CREATE TABLE purchase_orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  requisition_id INT,
  vendor_id INT,
  approved_by VARCHAR(100),
  status VARCHAR(50) DEFAULT 'Created',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (requisition_id) REFERENCES requisitions(id),
  FOREIGN KEY (vendor_id) REFERENCES vendors(id)
);
