<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdRequest;
use App\Http\Resources\AdCollection;
use App\Http\Resources\AdResource;
use App\Models\Ad;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class AdController extends Controller
{
    /**
     * @return AdCollection
     */
    public function index(): AdCollection
    {
        return new AdCollection(Ad::paginate());
    }

    /**
     * @param  AdRequest  $request
     *
     * @return AdResource
     */
    public function store(AdRequest $request): AdResource
    {
        $ad = Ad::create([
                'title' => $request->get('title'),
                'description' => $request->get('description'),
                'url' => $request->get('url'),
            ]);

        $ad->save();

        return new AdResource($ad);
    }

    /**
     * @param  int  $id
     * @param  AdRequest  $request
     *
     * @return AdResource
     */
    public function update(int $id, AdRequest $request): AdResource
    {
        $ad = Ad::find($id);

        if (!$ad) {
            throw new ModelNotFoundException('Ad not found');
        }

        $ad->update([
            'title' => $request->get('title'),
            'description' => $request->get('description'),
            'url' => $request->get('url'),
        ]);

        return new AdResource($ad);
    }

    /**
     * @param  int  $id
     *
     * @return array
     */
    public function destroy(int $id): array
    {
        $ad = Ad::find($id);

        if (!$ad) {
            throw new ModelNotFoundException('Ad not found');
        }

        return ['delete' => $ad->delete()];
    }

    /**
     * @param  int  $id
     *
     * @return AdResource
     */
    public function show(int $id): AdResource
    {
        $ad = Ad::find($id);

        if (!$ad) {
            throw new ModelNotFoundException('Ad not found');
        }

        return new AdResource($ad);
    }
}
