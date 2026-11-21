const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema(
  {
    companyName: { type: String, default: 'ClevTech DevHub' },
    parentBrand: { type: String, default: 'ClevTech Global Ventures' },
    logo: { type: String, default: '' },
    tagline: { type: String, default: 'Building Digital Products That Move Businesses Forward.' },
    email: { type: String, default: 'hello@clevtechdevhub.com' },
    phone: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    address: { type: String, default: '' },
    aboutText: { type: String, default: '' },
    heroTitle: { type: String, default: 'Building Digital Products That Move Businesses Forward.' },
    heroDescription: {
      type: String,
      default:
        'ClevTech DevHub designs and builds modern websites, full-stack web applications, APIs, dashboards, and custom software for growing businesses.',
    },
    seoTitle: { type: String, default: 'ClevTech DevHub — Full-Stack Software Development' },
    seoDescription: {
      type: String,
      default: 'ClevTech DevHub builds professional websites, web applications, APIs and dashboards.',
    },
    socialLinks: {
      github: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      twitter: { type: String, default: '' },
      facebook: { type: String, default: '' },
      instagram: { type: String, default: '' },
      youtube: { type: String, default: '' },
      whatsapp: { type: String, default: '' },
    },
    maintenanceMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Enforce a single settings document (singleton pattern).
siteSettingsSchema.statics.getSettings = async function getSettings() {
  let settings = await this.findOne();
  if (!settings) {
    settings = await this.create({});
  }
  return settings;
};

module.exports = mongoose.model('SiteSettings', siteSettingsSchema);
