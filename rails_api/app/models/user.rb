class User < ActiveRecord::Base
  has_secure_password
  has_many :assignments
  has_many :tasks, through: :assignments 

  has_many :comments
  has_many :tasks, through: :assignments

  EMAIL_REGEX = /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]+)\z/i
  validates :first_name, :last_name, :department, presence: true, length: { in: 2..20 }
  validates :email, presence: true, uniqueness: { case_sensitive: false }, format: { with: EMAIL_REGEX }
  validates :nickname, presence:true, uniqueness: { case_sensitive: false }

  before_save do
  	self.email.downcase!
    self.first_name.downcase!
    self.last_name.downcase!
    self.nickname.downcase!
    self.department.downcase!
  end
end
