/*
  # Seed settings data
  1. Insert sample settings
*/
INSERT INTO settings (key, value_json) VALUES
('bank_details', '{"account_name": "Carp Fishing Lake Ltd", "sort_code": "12-34-56", "account_number": "12345678", "iban": "FR76 3000 3000 3000 3000 3000 300", "swift_bic": "CFLKFRPP"}'),
('deposit_policy', '{"amount": 400, "days": 2, "description": "£400 deposit due within 48 hours"}'),
('check_in_out_times', '{"check_in": "14:00", "check_out": "10:00"}'),
('prefix', '{"booking": "LR"}');
