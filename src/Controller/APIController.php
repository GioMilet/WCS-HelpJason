<?php

namespace App\Controller;

use App\Entity\Crew;
use App\Repository\CrewRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Normalizer\NormalizerInterface;
use Symfony\Component\Serializer\SerializerInterface;

class APIController extends AbstractController{

    /**
     * @Route("/api", name="api_list_members", methods={"GET"})
     */
    public function showCrew(CrewRepository $crew, NormalizerInterface $normalizer){
        $crewMembers = $crew->findAll();

        $crewMembersNormalized = $normalizer->normalize($crewMembers, null);
        $json = json_encode($crewMembersNormalized);
        $response = new Response($json, 200, ['Content-Type'=>'application/json']);
        
        return $response;
        
    }
     
    /**
     * @Route("/api", name="api_add_member", methods={"POST"})
     */
    public function addMember(Request $request, SerializerInterface $serializer, EntityManagerInterface $em){
        $data = $request->getContent();
        
        $newMember = $serializer->deserialize($data, Crew::class, 'json');
        
        $em->persist($newMember);
        $em->flush();

        $json = $serializer->serialize($newMember, 'json');
        $response = new JsonResponse($json, 201, [], true);
;        return $response;
     }
}