using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Models
{
	public class Stegosaurus : Dino
	{
		public Stegosaurus(double x, double y, double z, double rotationX, double rotationY, double rotationZ) : base("steg", x, y, z, rotationX, rotationY, rotationZ)
		{

		}

		public override bool Update(int tick)
		{
			return base.Update(tick);

		}
	}
}
