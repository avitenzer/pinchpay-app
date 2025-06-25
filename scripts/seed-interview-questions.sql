-- Seed interview questions for the WhatsApp chatbot
-- This script populates the interview questions that will be asked to users

CREATE TABLE IF NOT EXISTS interview_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question_key VARCHAR(100) UNIQUE NOT NULL,
    question_text TEXT NOT NULL,
    question_type VARCHAR(50) NOT NULL, -- text, number, choice, boolean
    validation_rules JSONB,
    order_sequence INTEGER NOT NULL,
    is_required BOOLEAN DEFAULT true,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert interview questions
INSERT INTO interview_questions (question_key, question_text, question_type, validation_rules, order_sequence) VALUES
('monthly_income', 'How much do you earn per month? (Please provide your gross monthly income in USD)', 'number', '{"min": 1000, "max": 50000}', 1),

('employment_length', 'How long have you been in your current role? (Please answer in months, e.g., 6 for 6 months, 24 for 2 years)', 'number', '{"min": 1, "max": 600}', 2),

('credit_score', 'What is your credit score? (If you don''t know, you can say "unknown" or provide an estimate)', 'text', '{"pattern": "^(unknown|[3-8][0-9]{2})$"}', 3),

('pay_frequency', 'How often do you get paid?', 'choice', '{"options": ["weekly", "biweekly", "monthly", "irregular"]}', 4),

('pay_day', 'What day(s) of the week or month do you typically get paid? (e.g., "Friday" for weekly, "15th" for monthly)', 'text', '{}', 5),

('consistent_amount', 'Do you receive the same amount each paycheck?', 'choice', '{"options": ["yes", "no", "mostly"]}', 6),

('employment_type', 'What type of employment do you have?', 'choice', '{"options": ["full-time", "part-time", "contract", "gig-work", "self-employed"]}', 7),

('bank_primary', 'Is the bank account you connected your primary account where you receive your paychecks?', 'choice', '{"options": ["yes", "no"]}', 8),

('previous_advances', 'Have you used payday advance or cash advance services before?', 'choice', '{"options": ["yes", "no"]}', 9),

('advance_reason', 'What would you primarily use wage advances for?', 'choice', '{"options": ["emergency expenses", "bills", "groceries", "transportation", "other"]}', 10),

('monthly_expenses', 'What are your approximate monthly expenses? (rent, utilities, food, etc.)', 'number', '{"min": 500, "max": 20000}', 11),

('dependents', 'How many dependents do you have? (spouse, children, etc.)', 'number', '{"min": 0, "max": 10}', 12),

('address_confirmation', 'Please confirm your current address for card shipping:', 'text', '{}', 13),

('terms_agreement', 'Do you agree to PinchPay''s Terms of Service and Privacy Policy? (Please answer "yes" to continue)', 'choice', '{"options": ["yes"]}', 14);

-- Create approval rules table
CREATE TABLE IF NOT EXISTS approval_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rule_name VARCHAR(100) NOT NULL,
    rule_description TEXT,
    rule_logic JSONB NOT NULL,
    weight DECIMAL(3,2) DEFAULT 1.00,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert approval rules
INSERT INTO approval_rules (rule_name, rule_description, rule_logic, weight) VALUES
('minimum_income', 'User must have minimum monthly income', '{"field": "monthly_income", "operator": ">=", "value": 1500}', 1.00),

('employment_stability', 'User must be employed for at least 2 months', '{"field": "employment_length", "operator": ">=", "value": 2}', 0.80),

('consistent_income', 'User should have consistent pay amounts', '{"field": "consistent_amount", "operator": "in", "value": ["yes", "mostly"]}', 0.60),

('primary_bank', 'Connected bank should be primary account', '{"field": "bank_primary", "operator": "=", "value": "yes"}', 0.70),

('reasonable_expenses', 'Monthly expenses should be reasonable vs income', '{"field": "expense_ratio", "operator": "<=", "value": 0.80}', 0.50),

('full_time_employment', 'Preference for full-time employment', '{"field": "employment_type", "operator": "=", "value": "full-time"}', 0.40);
