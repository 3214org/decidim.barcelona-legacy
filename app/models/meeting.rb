class Meeting < ActiveRecord::Base
  extend FriendlyId
  include PgSearch
  include SearchCache
  include Categorizable
  include Taggable

  belongs_to :author, -> { with_hidden }, class_name: 'User', foreign_key: 'author_id'

  has_many :meeting_proposals
  accepts_nested_attributes_for :meeting_proposals
  has_many :proposals, through: :meeting_proposals

  scope :pending, -> { where(closed_at: nil) } 
  scope :closed, -> { where('closed_at is not ?', nil) } 
  scope :upcoming, -> { where("held_at >= ?", Date.today) }

  validates :author, presence: true
  validates :title, presence: true
  validates :description, presence: true
  validates :address, presence: true
  validates :held_at, presence: true
  validates :start_at, presence: true
  validates :end_at, presence: true
  validates :scope, inclusion: { in: %w(city district) }
  validates :district, inclusion: { in: Proposal::DISTRICTS.map(&:last).map(&:to_i), allow_nil: true }

  pg_search_scope :pg_search, {
    against: {
      title:       'A',
      description: 'B'
    },
    associated_against: {
      tags: :name
    },
    using: {
      tsearch: { dictionary: "spanish", tsvector_column: 'tsv' }
    },
    ignoring: :accents,
    ranked_by: '(:tsearch)'
  }

  friendly_id :title, use: [:slugged, :finders]

  def searchable_values
    values = {
      title       => 'A',
      description => 'B'
    }
    tag_list.each{ |tag| values[tag] = 'C' }
    values[author.username] = 'C'
    values
  end

  def self.search(terms)
    self.pg_search(terms)
  end

  def supports
    proposals.sum(:votes)
  end
end
