import mongoose, { Schema, Document } from 'mongoose';

export interface IGuest extends Document {
  slug: string;
  name: string;
  eventKeys: string[];
  createdAt: Date;
  updatedAt: Date;
  viewedAt?: Date;
}

export interface IWish extends Document {
  name: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  approvedAt?: Date;
}

export interface IAdminUser extends Document {
  email: string;
  passwordHash: string;
  createdAt: Date;
}

const GuestSchema = new Schema<IGuest>(
  {
    slug: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true },
    eventKeys: { type: [String], default: [] },
    viewedAt: { type: Date },
  },
  { timestamps: true }
);

const WishSchema = new Schema<IWish>(
  {
    name: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    approvedAt: { type: Date },
  },
  { timestamps: true }
);

const AdminUserSchema = new Schema<IAdminUser>(
  {
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export const Guest = mongoose.models.Guest || mongoose.model<IGuest>('Guest', GuestSchema);
export const Wish = mongoose.models.Wish || mongoose.model<IWish>('Wish', WishSchema);
export const AdminUser = mongoose.models.AdminUser || mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);
