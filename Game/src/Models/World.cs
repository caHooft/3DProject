using System;
using System.Threading;
using System.Collections.Generic;
using System.Linq;
using Controllers;
using System.Threading.Tasks;

namespace Models
{
  public class World : IObservable<Command>, IUpdatable
  {
    private List<IObserver<Command>> observers = new List<IObserver<Command>>();

    public World()
    {

    }

    public IDisposable Subscribe(IObserver<Command> observer)
    {
      if (!observers.Contains(observer))
      {
        observers.Add(observer);
      }

      return new Unsubscriber<Command>(observers, observer);
    }

    private void SendCommandToObservers(Command c)
    {
      for (int i = 0; i < this.observers.Count; i++)
      {
        this.observers[i].OnNext(c);
      }
    }

    public bool Update(int tick)
    {
      return true;
    }
  }

  internal class Unsubscriber<Command> : IDisposable
  {
    private List<IObserver<Command>> _observers;
    private IObserver<Command> _observer;

    internal Unsubscriber(List<IObserver<Command>> observers, IObserver<Command> observer)
    {
      this._observers = observers;
      this._observer = observer;
    }

    public void Dispose()
    {
      if (_observers.Contains(_observer))
        _observers.Remove(_observer);
    }
  }
}
