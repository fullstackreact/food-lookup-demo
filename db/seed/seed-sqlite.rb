#!/usr/bin/env ruby

require 'sqlite3'
require 'csv'

COLUMNS = {
 ndb_no: 'int', description: 'varchar(100)', water_g: 'real', kcal: 'real',
 protein_g: 'real', lipid_total_g: 'real', ash_g: 'real', carbohydrate_g: 'real',
 fiber_td_g: 'real', sugar_g: 'real', calcium_mg: 'real', iron_mg: 'real',
 magnesium_mg: 'real', phosphorus_mg: 'real', potassium_mg: 'real',
 sodium_mg: 'real', zinc_mg: 'real', copper_mg: 'real', manganese_mg: 'real',
 selenium_ug: 'real', vit_c_mg: 'real', thiamin_mg: 'real', riboflavin_mg: 'real',
 niacin_mg: 'real', panto_acid_mg: 'real', vit_b6_mg: 'real', folate_tot_ug: 'real',
 folic_acid_ug: 'real', food_folate_ug: 'real', folate_dfe_ug: 'real',
 choline_tot_mg: 'real', vit_b12_ug: 'real', vit_a_iu: 'real', vit_a_rae: 'real',
 retinol_ug: 'real', alpha_carot_ug: 'real', beta_carot_ug: 'real',
 beta_crypt_ug: 'real', lycopene_ug: 'real', lut_and_zea_ug: 'real',
 vit_e_mg: 'real', vit_d_ug: 'real', vit_d_iu: 'real', vit_k_ug: 'real',
 fa_sat_g: 'real', fa_mono_g: 'real', fa_poly_g: 'real', cholestrl_mg: 'real',
 gmwt_1: 'real', gmwt_desc1: 'varchar(100)', gmwt_2: 'real', gmwt_desc2: 'varchar(100)',
 refuse_pct: 'real'
}

db = SQLite3::Database.new '../usda-nnd.sqlite3'

res = db.execute 'SELECT name FROM sqlite_master WHERE type = "table"'

if res.flatten.include?('entries')
  puts 'table `entries` already exists — dropping'
  db.execute 'DROP TABLE entries'
end

columns = COLUMNS.inject('') do |memo, pair|
  name, type = pair
  memo += "\n#{name} #{type},"
end.chomp(',')

db.execute <<-SQL
  create table entries (
    #{columns}
  );
SQL

print "\nWorking..."

dir = File.dirname(File.expand_path(__FILE__))
lineno = 1
CSV.foreach(File.join(dir, 'raw-ndb.csv'), {:encoding => 'ISO8859-1'}) do |row|
  lineno = $.

  next if lineno == 1
  print '.' if lineno % 1000 == 0

  # Humanize descriptions
  row[1] = row[1].capitalize.gsub(/([\,\/])\s*/, '\1 ').gsub(/\s*\&\s*/, ' \1 ')

  sql = <<-SQL
    INSERT INTO entries (#{COLUMNS.keys.join(', ')})
    VALUES (#{(['?'] * COLUMNS.size).join(', ')})
SQL
  db.execute sql, row
end

print "done."
print "\n#{lineno} entries imported."
