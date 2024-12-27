"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function AddVehicleDialog({
    addVehicle,
}: {
    addVehicle: (vehicleNumber: string, vehicleType: string) => void;
}) {
    const [vehicleNumber, setVehicleNumber] = useState("");
    const [vehicleType, setVehicleType] = useState("");
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
        setVehicleNumber("");
        setVehicleType("");
    };

    const handleSubmit = () => {
        if (!vehicleNumber || !vehicleType) {
            return;
        }
        addVehicle(vehicleNumber, vehicleType);
        handleClose();
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="default" size="lg">Add Vehicle</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add Vehicle</DialogTitle>
                    <DialogDescription>
                        Enter details of the vehicle you want to park.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Number
                        </Label>
                        <Input
                            id="vehicle-number"
                            placeholder="Enter Vehicle Number"
                            className="col-span-3"
                            required
                            autoFocus
                            value={vehicleNumber}
                            onChange={(e) => setVehicleNumber(e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">
                            Vehicle Type
                        </Label>
                        <Select value={vehicleType} onValueChange={setVehicleType} required>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="bike">Bike</SelectItem>
                                <SelectItem value="car">Car</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit} disabled={!vehicleNumber || !vehicleType}>
                        Add {vehicleType}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
