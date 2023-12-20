<?php

namespace App\Models;

use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Database\Eloquent\BroadcastsEvents;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class MenuItem extends Model
{
    use HasFactory, BroadcastsEvents;

    protected $guarded = [];

    public function categories() : BelongsToMany
    {
      return $this->belongsToMany(Category::class);
    }

    public function broadcastOn($event)
    {
      return ['mainmenu'];
    }

    public function broadcastWith($event)
    {
        return [
            'menuItem' => $this,
            'categories' => $this->categories->toArray(),
        ];
    }
}
