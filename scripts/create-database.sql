-- Create PinchPay database schema
-- This script sets up the core tables for the application

-- Users table - stores basic user information
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(20) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE,
    whatsapp_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'pending' -- pending, approved, rejected, suspended
);

-- Bank accounts table - stores encrypted bank connection data
CREATE TABLE IF NOT EXISTS bank_accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plaid_access_token TEXT NOT NULL, -- encrypted
    plaid_item_id VARCHAR(255) NOT NULL,
    bank_name VARCHAR(255) NOT NULL,
    account_type VARCHAR(50) NOT NULL,
    account_subtype VARCHAR(50),
    current_balance DECIMAL(12,2),
    available_balance DECIMAL(12,2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_primary BOOLEAN DEFAULT true
);

-- Income analysis table - stores processed income data
CREATE TABLE IF NOT EXISTS income_analysis (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    monthly_income DECIMAL(12,2),
    pay_frequency VARCHAR(20), -- weekly, biweekly, monthly, irregular
    pay_day_of_week INTEGER, -- 1-7 for weekly, null for others
    pay_day_of_month INTEGER, -- 1-31 for monthly, null for others
    income_consistency_score DECIMAL(3,2), -- 0.00 to 1.00
    last_3_months_avg DECIMAL(12,2),
    employment_length_months INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Interview responses table - stores WhatsApp interview data
CREATE TABLE IF NOT EXISTS interview_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_id VARCHAR(255) NOT NULL,
    question_key VARCHAR(100) NOT NULL,
    question_text TEXT NOT NULL,
    response_text TEXT,
    response_value DECIMAL(12,2), -- for numeric responses
    asked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    responded_at TIMESTAMP,
    is_completed BOOLEAN DEFAULT false
);

-- ACH authorizations table - stores consent and authorization data
CREATE TABLE IF NOT EXISTS ach_authorizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    authorization_text TEXT NOT NULL,
    consent_timestamp TIMESTAMP NOT NULL,
    ip_address INET,
    user_agent TEXT,
    signature_data TEXT, -- digital signature if applicable
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crypto wallets table - virtual wallet management
CREATE TABLE IF NOT EXISTS crypto_wallets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    wallet_address VARCHAR(255) UNIQUE NOT NULL,
    wallet_type VARCHAR(50) DEFAULT 'custodial',
    private_key_encrypted TEXT, -- only for custodial wallets
    balance_usd DECIMAL(12,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Debit cards table - physical/virtual card management
CREATE TABLE IF NOT EXISTS debit_cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    wallet_id UUID REFERENCES crypto_wallets(id) ON DELETE CASCADE,
    card_number_encrypted TEXT NOT NULL,
    card_type VARCHAR(20) DEFAULT 'virtual', -- virtual, physical
    expiry_month INTEGER NOT NULL,
    expiry_year INTEGER NOT NULL,
    cvv_encrypted TEXT NOT NULL,
    card_status VARCHAR(20) DEFAULT 'pending', -- pending, active, blocked, expired
    shipping_address TEXT,
    shipped_at TIMESTAMP,
    activated_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Subscriptions table - monthly subscription management
CREATE TABLE IF NOT EXISTS subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    plan_name VARCHAR(100) DEFAULT 'basic',
    monthly_fee DECIMAL(6,2) DEFAULT 9.99,
    billing_cycle_start DATE NOT NULL,
    next_billing_date DATE NOT NULL,
    payment_method_id VARCHAR(255), -- Stripe payment method ID
    subscription_status VARCHAR(20) DEFAULT 'active', -- active, paused, cancelled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Wage advances table - track advance requests and payments
CREATE TABLE IF NOT EXISTS wage_advances (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    requested_amount DECIMAL(10,2) NOT NULL,
    approved_amount DECIMAL(10,2),
    fee_amount DECIMAL(6,2),
    total_repayment DECIMAL(10,2),
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approval_date TIMESTAMP,
    disbursement_date TIMESTAMP,
    repayment_date DATE,
    status VARCHAR(20) DEFAULT 'pending', -- pending, approved, disbursed, repaid, defaulted
    repayment_method VARCHAR(20) DEFAULT 'ach' -- ach, manual
);

-- Transactions table - all financial transactions
CREATE TABLE IF NOT EXISTS transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    wallet_id UUID REFERENCES crypto_wallets(id),
    transaction_type VARCHAR(50) NOT NULL, -- advance, repayment, fee, card_transaction
    amount DECIMAL(12,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    description TEXT,
    reference_id VARCHAR(255), -- external transaction ID
    status VARCHAR(20) DEFAULT 'pending', -- pending, completed, failed, cancelled
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP
);

-- WhatsApp sessions table - track conversation sessions
CREATE TABLE IF NOT EXISTS whatsapp_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    phone_number VARCHAR(20) NOT NULL,
    session_type VARCHAR(50) NOT NULL, -- interview, support, onboarding
    current_step VARCHAR(100),
    session_data JSONB, -- store conversation state
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP,
    is_active BOOLEAN DEFAULT true
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone_number);
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);
CREATE INDEX IF NOT EXISTS idx_bank_accounts_user_id ON bank_accounts(user_id);
CREATE INDEX IF NOT EXISTS idx_income_analysis_user_id ON income_analysis(user_id);
CREATE INDEX IF NOT EXISTS idx_interview_responses_user_id ON interview_responses(user_id);
CREATE INDEX IF NOT EXISTS idx_interview_responses_session ON interview_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_crypto_wallets_user_id ON crypto_wallets(user_id);
CREATE INDEX IF NOT EXISTS idx_debit_cards_user_id ON debit_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_wage_advances_user_id ON wage_advances(user_id);
CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions(user_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_sessions_user_id ON whatsapp_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_whatsapp_sessions_phone ON whatsapp_sessions(phone_number);
