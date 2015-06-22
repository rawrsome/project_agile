class Task < ActiveRecord::Base
	has_many :assignments
	has_many :users, through: :assignments

	has_many :comments
	has_many :users, through: :assignments

	validates :title, :urgency, :status, :deadline, :description, :point, presence: true

	before_save do
		self.title.downcase!
		self.description.downcase!
		self.status.downcase!
	end
end
