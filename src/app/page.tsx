'use client'

import { AddVehicleDialog } from "@/_components/addVehicleDialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Trash } from "lucide-react";
import { useState } from "react";

export default function Home() {
  type Vehicles = {
    id: number;
    carNumber: string;
  };

  const [bikes, setBikes] = useState<Vehicles[]>([]);
  const [cars, setCars] = useState<Vehicles[]>([]);
  const { toast } = useToast();

  const addBike = (carNumber: string) => {
    if (bikes.length >= 10) {
      toast({
        title: "No space available",
        description: "Parking is full for bikes",
      });
      return;
    }
    const newBike = { id: bikes.length + 1, carNumber };
    setBikes([...bikes, newBike]);
  };

  const removeBike = (id: number) => {
    if (bikes.length === 0) {
      toast({
        title: "No bikes parked",
        description: "No bikes parked to remove",
      });
      return;
    }
    const newBikes = bikes.filter((bike) => bike.id !== id);
    setBikes(newBikes);
  };

  const addCar = (carNumber: string) => {
    if (cars.length >= 10) {
      toast({
        title: "No space available",
        description: "Parking is full for cars",
      });
      return;
    }
    const newCar = { id: cars.length + 1, carNumber };
    setCars([...cars, newCar]);
  };

  const removeCar = (id: number) => {
    if (cars.length === 0) {
      toast({
        title: "No cars parked",
        description: "No cars parked to remove",
      });
      return;
    }
    const newCars = cars.filter((car) => car.id !== id);
    setCars(newCars);
  }

  const addVehicle = (vehicleNumber: string, vehicleType: string) => {
    if (vehicleType === "bike") {
      addBike(vehicleNumber);
    } else if (vehicleType === "car") {
      addCar(vehicleNumber);
    }
  }

  return (
    <>
      <h1 className="text-3xl mt-16 px-16">Parking System</h1>
      <div className="divide-y px-16">
        <div className="flex justify-center flex-row my-8">
          <Card className="w-1/2 mr-8">
            <CardHeader>Bikes</CardHeader>
            <CardContent>
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">ID</TableHead>
                    <TableHead className="text-center">Bike Number</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-center">
                  {bikes.map((bike, index) => (
                    <TableRow key={index}>
                      <TableCell>{bike.id}</TableCell>
                      <TableCell>{bike.carNumber}</TableCell>
                      <TableCell><Button variant="outline" onClick={() => removeBike(bike.id)}><Trash /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {bikes.length === 0 && <p className="text-center p-8">No bikes parked</p>}
            </CardContent>
          </Card>
          <Card className="w-1/2 ml-8">
            <CardHeader>Cars</CardHeader>
            <CardContent>
              <Table className="w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center">ID</TableHead>
                    <TableHead className="text-center">Car Number</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-center">
                  {cars.map((car, index) => (
                    <TableRow key={index}>
                      <TableCell>{car.id}</TableCell>
                      <TableCell>{car.carNumber}</TableCell>
                      <TableCell><Button variant="outline" onClick={() => removeCar(car.id)}><Trash /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {cars.length === 0 && <p className="text-center p-8">No cars parked</p>}
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-start items-center py-8">
          <Label className="mr-4">Add More Vehicles: </Label>
          <AddVehicleDialog addVehicle={addVehicle} />
        </div>
      </div>
    </>
  );
}
